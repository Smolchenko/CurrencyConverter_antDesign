import { useState, useEffect } from "react";
import { Button, Form, Input, InputNumber } from "antd";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 10 }
};

const CurrencyCalculationForm = ({
  base_currency,
  target_currency,
  setActiveButton
}) => {
  const [form] = Form.useForm();
  const [pair, setPair] = useState({
    // base: "ILS",
    base: base_currency,
    target: target_currency
  });
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [calculated_result, setCalculatedResult] = useState("");
  const [frozen_result, setFrozenResult] = useState("");
  const [error, setError] = useState("");

  const successful_result = frozen_result || calculated_result;
  const disableBtnAfterSubmit =
    frozen_result === calculated_result && frozen_result !== "";
  const result = error ? (
    <span className="error">{error}</span>
  ) : (
    <span className="result">{successful_result}</span>
  );

  const isDisabled =
    !amount ||
    !pair.base ||
    pair.base.length < 3 ||
    !pair.target ||
    pair.target.length < 3;

  useEffect(() => {
    if (base_currency && target_currency) {
      setPair({
        base: base_currency,
        target: target_currency
      });
      setAmount(1);
      setIsSubmitting(false);
      setFrozenResult("");
    }
  }, [base_currency, target_currency]);

  useEffect(() => {
    form.setFieldsValue({
      base_currency: pair.base,
      target_currency: pair.target,
      amount: amount
    });
  }, [pair.base, pair.target, amount, form]);

  const handlePairChange = (type) => (e) => {
    setPair((prevPair) => ({ ...prevPair, [type]: e.target.value }));
    setIsSubmitting(false);
    setFrozenResult("");
  };

  const handleAmount = (e) => {
    // setAmount(e.target.value);
    setAmount(e);
    setIsSubmitting(false);
    setFrozenResult("");
  };

  const handleFinish = (values, event) => {
    // values is an object containing the form field values submitted by the user
    // event.preventDefault();
    // handle form submit logic here
    handleSubmit(values);
  };

  const handleSubmit = (values) => {
    setIsSubmitting(true);

    const fetchData = async () => {
      const myHeaders = new Headers();
      myHeaders.append("apikey", "2roOp2yXcDEWy1y5cj8paHqtQEFwVHjp");
      try {
        const requestOptions = {
          method: "GET",
          redirect: "follow",
          headers: myHeaders
        };
        const response = await fetch(
          `https://api.apilayer.com/fixer/convert?to=${pair.target}&from=${pair.base}&amount=${amount}`,
          requestOptions
        );
        const data = await response.json();

        if (data.success === true) {
          const saved_result = `${amount} ${pair.base} = ${data.result} ${pair.target}`;
          // console.log(data);
          setCalculatedResult(saved_result);
          setFrozenResult(saved_result);
          setError("");
        } else {
          throw new Error(data.error.info);
        }
      } catch (error) {
        // console.log("error", error.message);
        setError(error.message);
        setCalculatedResult(error.message);
        setFrozenResult(error.message);
      }
      setActiveButton(pair);
      setIsSubmitting(false);
    };
    fetchData();
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);

  //   const fetchData = async () => {
  //     const myHeaders = new Headers();
  //     myHeaders.append("apikey", "2roOp2yXcDEWy1y5cj8paHqtQEFwVHjp");
  //     try {
  //       const requestOptions = {
  //         method: "GET",
  //         redirect: "follow",
  //         headers: myHeaders
  //       };
  //       const response = await fetch(
  //         `https://api.apilayer.com/fixer/convert?to=${pair.target}&from=${pair.base}&amount=${amount}`,
  //         requestOptions
  //       );
  //       const data = await response.json();

  //       if (data.success === true) {
  //         const saved_result = `${amount} ${pair.base} = ${data.result} ${pair.target}`;
  //         // console.log(data);
  //         setCalculatedResult(saved_result);
  //         setFrozenResult(saved_result);
  //         setError("");
  //       } else {
  //         throw new Error(data.error.info);
  //       }
  //     } catch (error) {
  //       // console.log("error", error.message);
  //       setError(error.message);
  //       setCalculatedResult(error.message);
  //       setFrozenResult(error.message);
  //     }
  //     setActiveButton(pair);
  //     setIsSubmitting(false);
  //   };
  //   fetchData();
  // };

  return (
    <Form
      form={form}
      {...layout}
      onFinish={handleFinish}
      style={{ maxWidth: 600, paddingTop: "20px" }}
    >
      <Form.Item
        name="base_currency"
        label="From:"
        // rules={[{ required: true, max: 3 }]}
        rules={[{ required: true }]}
      >
        <Input
          type="text"
          maxLength="3"
          value={pair.base}
          onChange={handlePairChange("base")}
        />
      </Form.Item>
      <Form.Item
        name="target_currency"
        label="To:"
        // rules={[{ required: true, max: 3 }]}
        rules={[{ required: true }]}
      >
        <Input
          type="text"
          maxLength="3"
          value={pair.target}
          onChange={handlePairChange("target")}
        />
      </Form.Item>
      {/* <Form.Item name={amount} label="Age" rules={[{ type: "number", min: 1 }]}> */}
      <Form.Item
        name="amount"
        label="Amount"
        rules={[{ required: true, min: 1, type: "number" }]}
      >
        <InputNumber
          type="number"
          value={amount}
          onChange={handleAmount}
          min={1}
        />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
        <Button
          type="primary"
          htmlType="submit"
          style={{ margin: "30px 20px 30px 0" }}
          disabled={isDisabled || disableBtnAfterSubmit || isSubmitting}
          // disabled={
          // form.getFieldsError().filter(({ errors }) => errors.length).length
          // }
        >
          {isSubmitting
            ? "Searching"
            : disableBtnAfterSubmit
            ? "Result"
            : "Convert"}
        </Button>
        {result}
      </Form.Item>
    </Form>
  );
};

export default CurrencyCalculationForm;
