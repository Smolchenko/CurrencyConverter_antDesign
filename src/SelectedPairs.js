import { Button, Space } from "antd";

const SELECTED_PAIRS = [
  { id: 1, base: "EUR", target: "USD" },
  { id: 2, base: "EUR", target: "ILS" },
  { id: 3, base: "USD", target: "ILS" }
];

const SelectedPairs = ({
  onCurrencySelection,
  onUpdateActiveButton,
  activeButton
}) => {
  return (
    <Space size={8} direction="vertical">
      {SELECTED_PAIRS.map((pair) => {
        const active_btn = activeButton === `${pair.base}.${pair.target}`;
        return (
          <Button
            key={pair.id}
            type={active_btn ? "primary" : "default"}
            size="medium"
            style={{ textAlign: "left" }}
            onClick={() => {
              onCurrencySelection(pair);
              onUpdateActiveButton(pair);
            }}
          >
            {pair.base}.{pair.target}
          </Button>
        );
      })}
    </Space>
  );
};

export default SelectedPairs;
