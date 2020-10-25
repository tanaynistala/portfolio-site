import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import styled from "@emotion/styled";
import About from "components/About";
import Layout from "components/Layout";

const AboutTitle = styled("h1")`
    margin-bottom: 1em;
`

const RenderBody = ({ home, meta }) => (
    <>
        <Helmet
            title={`About`}
            titleTemplate={`%s | Tanay Nistala`}
            meta={[
                {
                    name: `description`,
                    content: meta.description,
                },
                {
                    property: `og:title`,
                    content: meta.title,
                },
                {
                    property: `og:description`,
                    content: meta.description,
                },
                {
                    property: `og:type`,
                    content: `website`,
                },
                {
                    name: `twitter:card`,
                    content: `summary`,
                },
                {
                    name: `twitter:creator`,
                    content: meta.author,
                },
                {
                    name: `twitter:title`,
                    content: meta.title,
                },
                {
                    name: `twitter:description`,
                    content: meta.description,
                },
            ].concat(meta)}
        />
        <Layout>
            <>
                <AboutTitle>About Me</AboutTitle>
                <About
                    bio={home.about_bio}
                    socialLinks={home.about_links}
                />
            </>
        </Layout>
    </>
);

export default ({ data }) => {
    //Required check for no data being returned
    const doc = data.prismic.allHomepages.edges.slice(0, 1).pop();
    const meta = data.site.siteMetadata;

    if (!doc) return null;

    return (
        <RenderBody home={doc.node} meta={meta}/>
    )
}

RenderBody.propTypes = {
    home: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
};

export const query = graphql`
    {
        prismic {
            allHomepages {
                edges {
                    node {
                        hero_title
                        hero_button_text
                        hero_button_link {
                            ... on PRISMIC__ExternalLink {
                                _linkType
                                url
                            }
                        }
                        content
                        about_title
                        about_bio
                        about_links {
                            about_link
                        }
                    }
                }
            }
        }
        site {
            siteMetadata {
                title
                description
                author
            }
        }
    }
`