import { Box, Button, Input, Select, Text } from "@chakra-ui/react";
import React, { useContext, useState } from "react";

import * as yup from "yup";
import { Formik } from "formik";
import TextError from "../../common/TextError";
import client from "../../../access/baseService";
import { useMutation } from "react-query";
import { AppContext } from "../../../context/AppContext";

const schema = yup.object().shape({
  typetransaction: yup
    .string("Type transaction is string")
    .required("Type transaction is required"),
  accountnumber: yup
    .number("Account number is number")
    .required("Account number is required"),
  amountVND: yup.number("Amount is number").required(),
  amountUSD: yup.number("Amount is number").required(),
  reason: yup.string("Reason is string").required("Reason is required"),
});

export default function AddTransaction({ onclose }) {
  const { refetchdata, listAccount, refetchTransactions } =
    useContext(AppContext);
  const [SelectedAccountId, setSelectedAccountId] = useState("");

  console.log(refetchdata);
  const mutation = useMutation(
    async (values) => {
      try {
        return await client.post(`/create-transaction`, {
          accountId: SelectedAccountId,
          amountVND: values.amountVND,
          amountUSD: values.amountUSD,
          reason: values.reason,
          type: values.typetransaction,
        });
      } catch (err) {
        return err?.response?.data;
      }
    },
    {
      onSuccess: (res) => {
        refetchdata();
        onclose();
        refetchTransactions();
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );
  function onSubmit(values) {
    try {
      mutation.mutateAsync(values);
    } catch (err) {
      return err?.response?.data;
    }
  }

  return (
    <Box>
      <Text>Add accountBank</Text>

      <Formik
        initialValues={{
          bankname: "",
          accountnumber: "",
          amountVND: 0,
          amountUSD: 0,
          typetransaction: "",
          reason: "",
        }}
        onSubmit={(values) => {
          onSubmit(values);
        }}
        validationSchema={schema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => {
          return (
            <>
              <Select
                placeholder="Please Select A Source"
                onChange={(e) => setSelectedAccountId(e.target.value)}
                w="100%"
                m="0 auto"
              >
                {listAccount?.data.map((item, idx) => (
                  <option name="bankname" color="red" value={item.id} key={idx}>
                    {item.source}
                  </option>
                ))}
              </Select>
              <TextError text={touched.bankname && errors.bankname} />
              <Input
                mt="20px"
                name="accountnumber"
                placeholder="Account number"
                onChange={handleChange("accountnumber")}
                onBlur={handleBlur}
                value={values.accountnumber}
              />
              <TextError text={touched.accountnumber && errors.accountnumber} />

              <Input
                mt="20px"
                datatype="currency"
                name="amountVND"
                type="number"
                placeholder="AmountVND"
                onChange={handleChange("amountVND")}
                onBlur={handleBlur}
                value={values.amountVND}
              />
              <TextError text={touched.amountVND && errors.amountVND} />
              <Input
                mt="20px"
                type="number"
                name="amountUSD"
                placeholder="AmountUSD"
                onChange={handleChange("amountUSD")}
                onBlur={handleBlur}
                value={values.amountUSD}
              />

              <TextError text={touched.amountUSD && errors.amountUSD} />
              <Input
                mt="20px"
                name="reason "
                placeholder="Reason"
                onChange={handleChange("reason")}
                onBlur={handleBlur}
                value={values.reason}
              />
              <TextError text={touched.reason && errors.reason} />
              <Input
                mt="20px"
                name="typetransaction"
                placeholder="Type Transaction"
                onChange={handleChange("typetransaction")}
                onBlur={handleBlur}
                value={values.typetransaction}
              />
              <TextError
                text={touched.typetransaction && errors.typetransaction}
              />
              <Button
                isLoading={isSubmitting}
                loadingText="Adding"
                mt="20px"
                onClick={handleSubmit}
                spinnerPlacement="end"
              >
                Add Transaction
              </Button>
            </>
          );
        }}
      </Formik>
    </Box>
  );
}
