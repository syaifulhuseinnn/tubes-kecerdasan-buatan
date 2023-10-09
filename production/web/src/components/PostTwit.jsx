import React from "react";
import { Stack, Input, Button, Textarea } from "@chakra-ui/react";
import { Formik, Form } from "formik";

export default function PostTwit({ handleSubmitNewTwit }) {
  return (
    <Formik
      initialValues={{ newTwit: "" }}
      onSubmit={async (values, actions) => {
        console.log(values);
        try {
          await handleSubmitNewTwit(values.newTwit);
          actions.setSubmitting(false);
          actions.resetForm();
        } catch (error) {
          console.error(error);
        }
      }}
    >
      {(props) => (
        <Form>
          <Stack
            direction={{ base: "column" }}
            gap={{ base: 4 }}
            mt={{ base: 4 }}
          >
            <Textarea
              placeholder="Apa yang sedang kamu fikirkan?"
              size={{ base: "lg" }}
              onChange={props.handleChange}
              value={props.values.newTwit}
              name="newTwit"
              resize="none"
            />
            <Button
              maxWidth={{ base: "fit-content" }}
              alignSelf={{ base: "flex-end" }}
              bgColor="#8696FE"
              color="white"
              type="submit"
              isLoading={props.isSubmitting}
              loadingText="Twitting"
              _hover={{ backgroundColor: "#4942E4" }}
            >
              Twit 🚀
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
