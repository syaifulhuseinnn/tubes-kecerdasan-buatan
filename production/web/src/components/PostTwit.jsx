import React from "react";
import { Stack, Input, Button, Textarea } from "@chakra-ui/react";
import { Formik, Form } from "formik";

export default function PostTwit({ handleSubmitNewTwit }) {
  return (
    <Formik
      initialValues={{ newTwit: "" }}
      onSubmit={async (values, actions) => {
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
            <Stack direction={{ base: "column" }}>
              <Stack
                direction={{ base: "column", md: "row" }}
                display={{ base: `${props.touched.newTwit ? "flex" : "none"}` }}
              >
                <Button
                  size={{ base: "xs" }}
                  maxWidth="fit-content"
                  onClick={() =>
                    props.setFieldValue(
                      "newTwit",
                      "enak banget hari ini aku bercinta sama pacarku"
                    )
                  }
                >
                  enak banget hari ini aku bercinta sama pacarku
                </Button>
                <Button
                  size={{ base: "xs" }}
                  maxWidth="fit-content"
                  onClick={() =>
                    props.setFieldValue("newTwit", "Seru nih kenyot nenen nya")
                  }
                >
                  Seru nih kenyot nenen nya
                </Button>
              </Stack>
              <Textarea
                placeholder="Apa yang sedang kamu fikirkan?"
                size={{ base: "lg" }}
                onChange={props.handleChange}
                onFocus={(e) => props.setFieldTouched(e.target.name)}
                // onBlur={(e) =>
                //   setTimeout(
                //     () => props.setFieldTouched(e.target.name, false),
                //     1000
                //   )
                // }
                value={props.values.newTwit}
                name="newTwit"
                resize="none"
              />
            </Stack>
            <Button
              maxWidth={{ base: "fit-content" }}
              alignSelf={{ base: "flex-end" }}
              bgColor="#8696FE"
              color="white"
              type="submit"
              isLoading={props.isSubmitting}
              loadingText="Mengirim"
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
