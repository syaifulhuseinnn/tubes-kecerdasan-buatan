import React, { useEffect, useState } from "react";
import { Avatar, HStack, VStack, Heading, Text } from "@chakra-ui/react";
import getRandomColor from "../helpers/getRandomColor";
import getRandomStyle from "../helpers/getRandomStyle";

export default function TwitComment({ text, email, id }) {
  const [profilePictureUrl, setProfilePictureUrl] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (id === user.id) {
      setProfilePictureUrl(user.profile_picture);
    } else {
      setProfilePictureUrl(
        `https://api.dicebear.com/7.x/${getRandomStyle()}/svg?seed=${
          email.split("@")[0]
        }&backgroundColor=${getRandomColor()}`
      );
    }
  }, []);

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
          src={profilePictureUrl}
          size={{ base: "md" }}
          borderWidth={1}
          borderColor="black"
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
