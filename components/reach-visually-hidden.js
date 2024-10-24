import {forwardRef} from "react";

export const VisuallyHidden = forwardRef(function VisuallyHidden(
    {as: Comp = "span", style = {}, ...props},
    ref
) {
    return (
        <Comp
            ref={ref}
            style={{
                border: 0,
                clip: "rect(0 0 0 0)",
                height: "1px",
                margin: "-1px",
                overflow: "hidden",
                padding: 0,
                position: "absolute",
                width: "1px",

                // https://medium.com/@jessebeach/beware-smushed-off-screen-accessible-text-5952a4c2cbfe
                whiteSpace: "nowrap",
                wordWrap: "normal",
                ...style,
            }}
            {...props}
        />
    );
});
VisuallyHidden.displayName = "VisuallyHidden";