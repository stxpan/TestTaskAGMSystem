import Document, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from 'next/document';

import { mediaStyle } from '@/shared/lib/media';

class MaehwaDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html lang={this.props.locale ?? 'en'}>
        <Head>
          <meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff" />
          <meta name="theme-color" media="(prefers-color-scheme: dark)" content="hsl(0 0% 3.9%)" />

          <style type="text/css" dangerouslySetInnerHTML={{ __html: mediaStyle }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MaehwaDocument;
