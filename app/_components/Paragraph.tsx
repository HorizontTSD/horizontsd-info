import { Typography } from "@mui/material";
import { replacePlaceholders } from "../_utils/replacePlaceholders";

interface ParagraphProps {
  item: {
    title?: string;
    content: string | string[];
  };
}

export default function Paragraph({ item }: ParagraphProps) {
  const renderContent = (content: string | string[]) => {
    if (Array.isArray(content)) {
      return content.map((text, index) => (
        <Typography
          key={index}
          variant="body1"
          sx={{
            fontFamily: `inherit`,
            color: "text.primary",
            mb: 2,
          }}
        >
          {replacePlaceholders(text)}
        </Typography>
      ));
    }
    return (
      <Typography
        variant="body1"
        sx={{
          fontFamily: `inherit`,
          color: "text.primary",
          mb: 2,
        }}
      >
        {replacePlaceholders(content)}
      </Typography>
    );
  };

  return (
    <section>
      {item.title && (
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontFamily: `inherit`,
            color: "text.primary",
            mb: 2,
          }}
        >
          {replacePlaceholders(item.title)}
        </Typography>
      )}
      {renderContent(item.content)}
    </section>
  );
}
