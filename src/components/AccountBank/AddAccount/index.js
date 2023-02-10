import { Box, Button, Input, Text } from "@chakra-ui/react";
import React, { useContext } from "react";

import * as yup from "yup";
import { Formik } from "formik";
import TextError from "../../common/TextError";
import client from "../../../access/baseService";
import { useMutation } from "react-query";
import { AppContext } from "../../../context/AppContext";

const schema = yup.object().shape({
  bankname: yup.string("Bank name is string").required("Bank name is required"),
  accountnumber: yup
    .number("Account number is number")
    .required("Account number is required"),
  balanceVND: yup.number("Balance is number").required(),
  balanceUSD: yup.number("Balance is number").required(),
});

export default function AddAccount({ onclose }) {
  const { refetchdata } = useContext(AppContext);
  const mutation = useMutation(
    async (values) => {
      try {
        return await client.post(`/create-account`, {
          source: values.bankname,
          account: values.accountnumber,
          balanceVND: values.balanceVND,
          balanceUSD: values.balanceUSD,
        });
      } catch (err) {
        return err?.response?.data;
      }
    },
    {
      onSuccess: (res) => {
        refetchdata();
        onclose();
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
          balanceVND: "",
          balanceUSD: "",
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
              <Input
                mt="20px"
                name="bankname"
                placeholder="Bank name"
                onChange={handleChange("bankname")}
                onBlur={handleBlur}
                value={values.bankname}
              />
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
                name="balanceVND"
                type="number"
                placeholder="balanceVND"
                onChange={handleChange("balanceVND")}
                onBlur={handleBlur}
                value={values.balanceVND}
              />
              <TextError text={touched.balanceVND && errors.balanceVND} />
              <Input
                mt="20px"
                type="number"
                name="balanceUSD"
                placeholder="balanceUSD"
                onChange={handleChange("balanceUSD")}
                onBlur={handleBlur}
                value={values.balanceUSD}
              />

              <TextError text={touched.balanceUSD && errors.balanceUSD} />
              <Button
                isLoading={isSubmitting}
                loadingText="Adding"
                mt="20px"
                onClick={handleSubmit}
                spinnerPlacement="end"
              >
                Add Account
              </Button>
            </>
          );
        }}
      </Formik>
    </Box>
  );
}
