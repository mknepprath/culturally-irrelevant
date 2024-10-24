import {
    createContext,
    forwardRef,
    useCallback,
    useContext,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState
} from "react"
import {createPortal} from "react-dom";
import FocusLock from "react-focus-lock";
import {RemoveScroll} from "react-remove-scroll";

const [DialogContextProvider, useDialogContext] = createDialogContext("DialogContext", {
    isOpen: false,
});


const DialogState = {
    Open: "open",
    Closed: "closed",
}

function DialogWrapper({
                           isOpen = true,
                           children,
                           ...props
                       }) {
    // We want to ignore the immediate focus of a tooltip so it doesn't pop
    // up again when the menu closes, only pops up when focus returns again
    // to the tooltip (like native OS tooltips).
    useEffect(() => {
        if (isOpen) {
            window.__REACH_DISABLE_TOOLTIPS = true;
        } else {
            window.requestAnimationFrame(() => {
                // Wait a frame so that this doesn't fire before tooltip does
                window.__REACH_DISABLE_TOOLTIPS = false;
            });
        }
    }, [isOpen]);

    return (
        <Portal
            data-reach-dialog-wrapper=""
            data-state={isOpen ? DialogState.Open : DialogState.Closed}
            {...props}
        >
            <DialogContextProvider isOpen={isOpen}>{children}</DialogContextProvider>
        </Portal>
    );
}

DialogWrapper.displayName = "unstable_DialogWrapper";

const DialogInner = forwardRef(function DialogInner(
    {
        allowPinchZoom,
        as: Comp = "div",
        dangerouslyBypassFocusLock,
        dangerouslyBypassScrollLock,
        initialFocusRef,
        onClick,
        onDismiss = noop,
        onKeyDown,
        onMouseDown,
        unstable_lockFocusAcrossFrames,
        ...props
    },
    forwardedRef
) {
    let {isOpen} = useDialogContext("DialogInner");

    const mouseDownTarget = useRef(null);
    const overlayNode = useRef(null);
    const ref = useComposedRefs(overlayNode, forwardedRef);

    const activateFocusLock = useCallback(() => {
        if (initialFocusRef && initialFocusRef.current) {
            initialFocusRef.current.focus();
        }
    }, [initialFocusRef]);

    function handleClick(event) {
        if (mouseDownTarget.current === event.target) {
            event.stopPropagation();
            onDismiss(event);
        }
    }

    function handleKeyDown(event) {
        if (event.key === "Escape") {
            event.stopPropagation();
            onDismiss(event);
        }
    }

    function handleMouseDown(event) {
        mouseDownTarget.current = event.target;
    }

    useEffect(() => {
        return overlayNode.current
            ? createAriaHider(overlayNode.current)
            : void null;
    }, []);

    return (
        <FocusLock
            autoFocus
            returnFocus
            onActivation={activateFocusLock}
            disabled={
                dangerouslyBypassFocusLock != null
                    ? dangerouslyBypassFocusLock
                    : !isOpen
            }
            crossFrame={unstable_lockFocusAcrossFrames ?? true}
        >
            <RemoveScroll
                allowPinchZoom={allowPinchZoom}
                enabled={
                    dangerouslyBypassScrollLock != null
                        ? !dangerouslyBypassScrollLock
                        : isOpen
                }
            >
                <Comp
                    {...props}
                    ref={ref}
                    data-reach-dialog-inner=""
                    data-state={isOpen ? DialogState.Open : DialogState.Closed}
                    /*
                     * We can ignore the `no-static-element-interactions` warning here
                     * because our overlay is only designed to capture any outside
                     * clicks, not to serve as a clickable element itself.
                     */
                    onClick={composeEventHandlers(onClick, handleClick)}
                    onKeyDown={composeEventHandlers(onKeyDown, handleKeyDown)}
                    onMouseDown={composeEventHandlers(onMouseDown, handleMouseDown)}
                />
            </RemoveScroll>
        </FocusLock>
    );
});
DialogInner.displayName = "DialogInner";

const DialogOverlay = forwardRef(function DialogOverlay(
    {as: Comp = "div", isOpen = true, ...props},
    forwardedRef
) {
    return isOpen ? (
        <DialogWrapper isOpen={isOpen}>
            <DialogInner
                data-reach-dialog-overlay=""
                ref={forwardedRef}
                as={Comp}
                {...props}
            />
        </DialogWrapper>
    ) : null;
});
DialogOverlay.displayName = "DialogOverlay";

const DialogContent = forwardRef(function DialogContent(
    {as: Comp = "div", onClick, onKeyDown, ...props},
    forwardedRef
) {
    let {isOpen} = useDialogContext("DialogContent");
    return (
        <Comp
            aria-modal="true"
            role="dialog"
            tabIndex={-1}
            {...props}
            ref={forwardedRef}
            data-reach-dialog-content=""
            data-state={isOpen ? DialogState.Open : DialogState.Closed}
            onClick={composeEventHandlers(onClick, (event) => {
                event.stopPropagation();
            })}
        />
    );
});
DialogContent.displayName = "DialogContent";

const Dialog = forwardRef(function Dialog(
    {
        allowPinchZoom = false,
        initialFocusRef,
        isOpen,
        onDismiss = noop,
        ...props
    },
    forwardedRef
) {
    return (
        <DialogOverlay
            allowPinchZoom={allowPinchZoom}
            initialFocusRef={initialFocusRef}
            isOpen={isOpen}
            onDismiss={onDismiss}
        >
            <DialogContent ref={forwardedRef} {...props} />
        </DialogOverlay>
    );
});
Dialog.displayName = "Dialog";

function createAriaHider(dialogNode) {
    let originalValues = [];
    let rootNodes = [];
    let ownerDocument = getOwnerDocument(dialogNode);

    if (!dialogNode) {
        return noop;
    }

    Array.prototype.forEach.call(
        ownerDocument.querySelectorAll("body > *"),
        (node) => {
            const portalNode = dialogNode.parentNode?.parentNode?.parentNode;
            if (node === portalNode) {
                return;
            }
            let attr = node.getAttribute("aria-hidden");
            let alreadyHidden = attr !== null && attr !== "false";
            if (alreadyHidden) {
                return;
            }
            originalValues.push(attr);
            rootNodes.push(node);
            node.setAttribute("aria-hidden", "true");
        }
    );

    return () => {
        rootNodes.forEach((node, index) => {
            let originalValue = originalValues[index];
            if (originalValue === null) {
                node.removeAttribute("aria-hidden");
            } else {
                node.setAttribute("aria-hidden", originalValue);
            }
        });
    };
}

const PortalImpl = ({
                        children,
                        type = "reach-portal",
                        containerRef,
                    }) => {
    let mountNode = useRef(null);
    let portalNode = useRef(null);
    let forceUpdate = useForceUpdate();

    useIsomorphicLayoutEffect(() => {
        // This ref may be null when a hot-loader replaces components on the page
        if (!mountNode.current) return;
        let ownerDocument = mountNode.current.ownerDocument;
        let body = containerRef?.current || ownerDocument.body;
        portalNode.current = ownerDocument?.createElement(type);
        body.appendChild(portalNode.current);
        forceUpdate();
        return () => {
            if (portalNode.current && body) {
                body.removeChild(portalNode.current);
            }
        };
    }, [type, forceUpdate, containerRef]);

    return portalNode.current ? (
        createPortal(children, portalNode.current)
    ) : (
        <span ref={mountNode}/>
    );
};

const Portal = ({
                    unstable_skipInitialRender,
                    ...props
                }) => {
    let [hydrated, setHydrated] = useState(false);
    useEffect(() => {
        if (unstable_skipInitialRender) {
            setHydrated(true);
        }
    }, [unstable_skipInitialRender]);
    if (unstable_skipInitialRender && !hydrated) {
        return null;
    }
    return <PortalImpl {...props} />;
};

function composeEventHandlers(theirHandler, ourHandler) {
    return (event) => {
        theirHandler && theirHandler(event);
        if (!event.defaultPrevented) {
            return ourHandler(event);
        }
    };
}

export function createDialogContext(
    rootComponentName,
    defaultContext
) {
    let Ctx = createContext(defaultContext);

    function Provider(props) {
        let {children, ...context} = props;
        let value = useMemo(
            () => context,
            Object.values(context)
        );
        return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
    }

    function useDialogContext(callerComponentName) {
        let context = useContext(Ctx);
        if (context) {
            return context;
        }
        if (defaultContext) {
            return defaultContext;
        }
        throw Error(
            `${callerComponentName} must be rendered inside of a ${rootComponentName} component.`
        );
    }

    Ctx.displayName = `${rootComponentName}Context`;
    Provider.displayName = `${rootComponentName}Provider`;
    return [Provider, useDialogContext];
}

function getOwnerDocument(element) {
    return canUseDOM() ? (element ? element.ownerDocument : document) : null;
}

function noop() {
}

function assignRef(
    ref,
    value
) {
    if (ref == null) return;
    if (isFunction(ref)) {
        ref(value);
    } else {
        try {
            ref.current = value;
        } catch (error) {
            throw new Error(`Cannot assign value "${value}" to ref "${ref}"`);
        }
    }
}

function useComposedRefs(...refs) {
    return useCallback((node) => {
        for (let ref of refs) {
            assignRef(ref, node);
        }
    }, refs);
}

function useForceUpdate() {
    let [, dispatch] = useState(Object.create(null));
    return useCallback(() => {
        dispatch(Object.create(null));
    }, []);
}

const useIsomorphicLayoutEffect = canUseDOM()
    ? useLayoutEffect
    : useEffect;

function canUseDOM() {
    return !!(
        typeof window !== "undefined" &&
        window.document &&
        window.document.createElement
    );
}

function isFunction(value) {
    return !!(value && {}.toString.call(value) === "[object Function]");
}

export {
    Dialog,
    DialogOverlay,
};