import { Text } from "@chakra-ui/react";

const IncreaseItem = ({ percent, isIncrease = false, type, currency }) => {
  const renderColor = () => {
    if (percent === 0) {
      return "black";
    }
    return isIncrease ? "#00BC6D" : "#F94243";
  };

  const render = () => {
    if (percent === 0) {
      return "";
    }
    return isIncrease ? "+" : "-";
  };

  return (
    <Text fontWeight={500} color={renderColor()}>
      {`${render()} ${new Intl.NumberFormat(`${type}`, {
        style: "currency",
        currency: `${currency}`,
      }).format(percent)}`}
    </Text>
  );
};
export default IncreaseItem;
