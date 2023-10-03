import React from "react";
import { Stack, Input, Button, Textarea } from "@chakra-ui/react";

export default function PostTwit({ handleSubmitNewTwit, setNewTwit, newTwit }) {
  return (
    <form onSubmit={(e) => handleSubmitNewTwit(e)}>
      <Stack direction={{ base: "column" }} gap={{ base: 4 }} mt={{ base: 4 }}>
        <Textarea
          placeholder="Write a twit..."
          size={{ base: "lg" }}
          onChange={(e) => setNewTwit(e.target.value)}
          value={newTwit}
          name="new-twit"
          resize="none"
        />
        <Button
          maxWidth={{ base: "fit-content" }}
          alignSelf={{ base: "flex-end" }}
          bgColor="#8696FE"
          color="white"
          type="submit"
        >
          Twit 🚀
        </Button>
      </Stack>
    </form>
  );
}
