import React from "react";
import { Avatar, HStack, VStack, Heading, Text } from "@chakra-ui/react";

export default function TwitComment({ text, email }) {
  return (
    <VStack
      alignItems="flex-start"
      mt={{ base: 4 }}
      ml={{ base: 4 }}
      gap={{ base: 4 }}
    >
      <HStack>
        <Avatar
          name={email}
          src={`https://api.dicebear.com/7.x/open-peeps/svg?seed=${email}&backgroundColor=068DA9`}
          size={{ base: "md" }}
        />
        <VStack alignItems="flex-start" gap={1}>
          <Heading size="xs">{email.split("@")[0]}</Heading>
          <Text as="small" color="gray.500" textTransform="lowercase">
            @{email.split("@")[0]}
          </Text>
        </VStack>
      </HStack>
      <Text>{text}</Text>
    </VStack>
  );
}
