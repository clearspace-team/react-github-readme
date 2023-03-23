import { PureComponent } from "react";

export interface GistProps {
  url: string;
}

declare class Gist extends PureComponent<GistProps, any> {}

export default Gist;
