import React, { useState, useEffect } from "react";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import CodeBlock from "../../components/CodeBlock";

const Post = (props) => {
  const [post, setPost] = useState(null);

  useEffect(async () => {
    const content = await import(
      `../../content/${window.location.pathname.replace("/writing/", "")}.md`
    );
    const data = matter(content.default);

    setPost({
      header: data.data,
      content: data.content,
    });
  }, []);

  return (
    post && (
      <>
        <h1 className="mt-32 mb-32 text-center leading-loose font-bold xl:text-6xl lg:text-4xl md:text-5xl text-4xl">
          {post.header.title}
        </h1>

        {/* <p className="mt-5 text-xl text-gray-500 leading-relaxed">
          {post.header.date}
        </p> */}

        <div className="writing-container">
          <ReactMarkdown
            source={post.content}
            escapeHtml={false}
            renderers={{
              inlineCode: ({ value }) => {
                return (
                  <span className="inline-block text-indigo-600 text-xl">
                    `{value}`
                  </span>
                );
              },
              code: CodeBlock,
              link: (props) => {
                if (!props.href.startsWith("http")) {
                  return (
                    <a href={props.href} rel="nofollow noreferrer noopener">
                      {props.children}
                    </a>
                  );
                }

                return (
                  <a
                    href={props.href}
                    rel="nofollow noreferrer noopener"
                    target="_blank"
                  >
                    {props.children}
                  </a>
                );
              },
            }}
          />

          <p
            style={{
              borderTop: "1px solid #e2e8f0",
              marginTop: "2em",
              paddingTop: "1em",
            }}
          >
            Merci de m'avoir lu jusqu'au bout ! 😊 N'hésitez pas à partager
            l'article sur {` `}
            <a
              href={`https://twitter.com/share?text=${encodeURI(
                post.header.title
              )}&url=${encodeURI(window.location.href)}`}
            >
              Twitter
            </a>
            .
          </p>
        </div>
      </>
    )
  );
};

Post.getInitialProps = async (context) => {
  const content = await import(`../../content/${context.query.slug}.md`);
  const data = matter(content.default);

  return { ...data };
};

export default Post;
