import { remark } from 'remark';
import html from 'remark-html';

export const RenderMarkdown = ({ text }: any) => {
  const markdown = remark().use(html).processSync(text).toString();
  return <div dangerouslySetInnerHTML={{ __html: markdown }} />;
};
