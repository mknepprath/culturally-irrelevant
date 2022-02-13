import { EPISODES } from "../../libs/constants";

export default (_, res) => {
  // console.log(`${process.env.NEXT_PUBLIC_S3_BUCKET}/${id}.mp3`);

  res.setHeader("Content-Type", "text/xml");
  res.write(`<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
  <title>Culturally Irrelevant</title> <link>https://www.culturallyirrelevant.com/</link>
  <language>en-us</language>
  <copyright>© 2022 Michael Knepprath</copyright>
  <itunes:author>Michael Knepprath</itunes:author>
  <description> A podcast where four friends shared and discussed the unseen, unplayed, unread, and all-around overlooked in movies, video games, comic books and whatever else they could come up with.
  </description>
  <itunes:type>episodic</itunes:type>
  <itunes:owner> <itunes:name>Culturally Irrelevant</itunes:name>
  <itunes:email>mknepprath@gmail.com</itunes:email>
  </itunes:owner>
  <itunes:image
  href="https://www.culturallyirrelevant.com/podcast-art.png"
  />
  <itunes:category text="Visual Arts">
  <itunes:category text="Books"/> </itunes:category>
  <itunes:explicit>false</itunes:explicit>
  ${EPISODES.map(
    (data, index) => `<item>
  <title>#${data.episode} &#8211; ${data.title}</title>
  <link>https://www.culturallyirrelevant.com/</link>

  <dc:creator><![CDATA[flophouse]]></dc:creator>
  <pubDate>${data.publish_date}</pubDate>
      <category><![CDATA[Episodes]]></category>
  <category><![CDATA[Adam Rex]]></category>
  <category><![CDATA[Dan McCoy]]></category>
  <category><![CDATA[Dungeons & Dragons]]></category>
  <category><![CDATA[Elliott Kalan]]></category>
  <category><![CDATA[Jeremy Irons]]></category>
  <category><![CDATA[Justin Whalen]]></category>
  <category><![CDATA[Marlon Wayans]]></category>
  <category><![CDATA[Stuart Wellington]]></category>
  <category><![CDATA[Thora Birch]]></category>
  <category><![CDATA[Zoe McClellan]]></category>
  <guid isPermaLink="false">https://www.flophousepodcast.com/?p=12841</guid>

        <description><![CDATA[Episode ${data.episode}...]]></description>
                  <content:encoded><![CDATA[<p>Encoded content</p>]]></content:encoded>
  <enclosure url="https://culturallyirrelevant.s3.us-east-2.amazonaws.com/episodes/${
    index + 1
  }.mp3" length="131321241" type="audio/mpeg" />

    </item>`
  )}
  </channel>
  </rss>`);

  res.end();
};
