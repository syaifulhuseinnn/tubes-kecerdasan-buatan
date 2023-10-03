import React, { useState, useEffect } from "react";
import {
  Box,
  Stack,
  Image,
  Heading,
  Text,
  HStack,
  Button,
  Input,
  useDisclosure,
  Avatar,
  AspectRatio,
  Alert,
  Textarea,
} from "@chakra-ui/react";
import TwitComment from "./TwitComment";

export default function TwitItem({
  id,
  email,
  text,
  likes,
  comments,
  createdAt,
  imageUrl,
}) {
  const { isOpen, onToggle } = useDisclosure({
    defaultIsOpen: false,
  });

  const { isOpen: isOpenAltCom, onToggle: onToggleAltCom } = useDisclosure({
    defaultIsOpen: false,
  });

  const { isOpen: isAppendNewComment, onOpen: onOpenAppendNewComment } =
    useDisclosure({
      defaultIsOpen: false,
    });

  const [commentsData, setCommentsData] = useState([]);
  const [commentsLimit, setCommentsLimit] = useState(2);
  const [commentLength, setCommentLength] = useState(comments);
  const [newComment, setNewComment] = useState("");
  const [newCommentPayload, setNewCommentPayload] = useState([]);

  const getComments = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/comments"
      );

      const data = await response.json();
      setCommentsData(data.slice(0, commentLength));
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoadMoreComments = () => setCommentsLimit((prev) => (prev += 1));

  const handleSubmitComment = async (newComment) => {
    try {
      const response = await fetch("http://localhost:5002/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ text: newComment }),
      });

      const data = await response.json();

      if (data.prediction === "POSITIF") {
        const copyCommentsData = [...commentsData];

        const payload = {
          email: "batistuta",
          body: newComment,
        };

        copyCommentsData.push(payload);

        setNewCommentPayload([...newCommentPayload, payload]);
        // setCommentsData(copyCommentsData);
        setCommentLength((prev) => (prev += 1));
        setNewComment("");
        onOpenAppendNewComment();
      } else {
        onToggleAltCom();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      if (commentsData.length < 1) {
        getComments();
      }
    }
  }, [isOpen]);

  return (
    <Box borderWidth={1} borderRadius="md" p={4}>
      <Stack direction={{ base: "column" }} gap={4}>
        <Stack
          direction={{ base: "row" }}
          justifyContent={{ base: "space-between" }}
          gap={{ base: 4 }}
        >
          <HStack>
            <Avatar
              src="https://api.dicebear.com/7.x/open-peeps/svg?backgroundColor=b6e3f4,c0aede,d1d4f9"
              size={{ base: "md" }}
            />
            <Stack direction={{ base: "column" }} gap={{ base: 1 }}>
              <Heading size={{ base: "sm" }}>{email.split("@")[0]}</Heading>
              <Text as="small" color="gray.500" textTransform="lowercase">
                @{email.split("@")[0]}
              </Text>
            </Stack>
          </HStack>
          <Text as="small" color="gray.500" mt={{ base: 1 }}>
            3h
          </Text>
        </Stack>
        <Box>
          <Text>{text}</Text>
          {imageUrl && (
            <AspectRatio ratio={4 / 3} mt={{ base: 4 }}>
              <Image src={imageUrl} alt="naruto" objectFit="cover" />
            </AspectRatio>
          )}
          <Stack direction="row" gap={{ base: 4 }} mt={{ base: 4 }}>
            <Button variant="link">❤️ {likes}</Button>
            <Button
              variant="link"
              onClick={onToggle}
              display={commentLength > 0 ? "block" : "none"}
            >
              💬 {commentLength}
            </Button>
          </Stack>

          {isOpen && (
            <>
              {commentsData.slice(0, commentsLimit).map((comment) => (
                <>
                  <TwitComment
                    key={comment.id}
                    email={comment.email}
                    text={comment.body}
                  />
                </>
              ))}
              <Button
                variant="link"
                size="xs"
                ml={{ base: 4 }}
                mt={{ base: 4 }}
                onClick={handleLoadMoreComments}
                display={commentLength <= commentsLimit ? "none" : "block"}
              >
                Lihat komentar lainnya
              </Button>
              {isAppendNewComment &&
                newCommentPayload.map((item, index) => (
                  <TwitComment
                    key={index}
                    email={item.email}
                    text={item.body}
                  />
                ))}
              <Alert
                status="info"
                borderRadius="md"
                display={isOpenAltCom ? "flex" : "none"}
                mt={{ base: 4 }}
              >
                <Text>
                  ℹ️ Komentar kamu <Text as="u">disembunyikan</Text> karena
                  mengandung <Text as="u">pornoteks</Text>!
                </Text>
              </Alert>
              <HStack mt={{ base: 4 }} ml={{ base: 4 }}>
                <Input
                  placeholder="Write comment"
                  onChange={(e) => setNewComment(e.target.value)}
                  value={newComment}
                />
                <Button
                  bgColor="#8696FE"
                  color="white"
                  onClick={() => handleSubmitComment(newComment)}
                >
                  Send
                </Button>
              </HStack>
            </>
          )}
        </Box>
      </Stack>
    </Box>
  );
}
