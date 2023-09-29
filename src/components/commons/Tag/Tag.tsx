import { TagWrapper } from "./styles";

interface TagProps {
  text: string;
}
const Tag: React.FC<TagProps> = ({ text }: TagProps) => {
  return <TagWrapper>{text}</TagWrapper>;
};

export default Tag;
