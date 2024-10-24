import { roleState } from "@/atom/role";
import { setBearerToken } from "@/networks/apiClient";
import { fetchLogin } from "@/networks/auth";
// import { allowedRoles } from "@/utils/constant/roles";
import {
  Button,
  Center,
  Container,
  Image,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";

export default function login() {
  const setRole = useSetRecoilState(roleState);

  const toast = useToast();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    setIsLoading(true);

    await fetchLogin({
      phone_number: phoneNumber,
      password: password,
    })
      .then((response) => {
        setIsLoading(false);
        const role =
          response?.data?.data?.role?.length > 0
            ? response?.data?.data?.role[0]?.name
            : "";

        localStorage.setItem("token", response?.data?.data?.token);
        localStorage.setItem("email", response?.data?.data?.email);
        localStorage.setItem(
          "phone_number",
          response?.data?.data?.phone_number
        );
        localStorage.setItem("role", role);
        setRole(role);
        setBearerToken(response?.data?.data?.token);

        router.push("/");
        // window.location.href = "/";
      })
      .catch((error) => {
        setIsLoading(false);
        toast({
          title: "Login Failed",
          description: error?.response?.data?.message,
          status: "error",
          isClosable: true,
          position: "top",
        });
      });
  };
  return (
    <Container bg="white" maxW="400px">
      <Center height="100dvh">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            login();
          }}
          style={{ width: "100%" }}
        >
          <Stack w="100%" alignItems="center" spacing="20px">
            <Image
              src="/images/logo-bma.png"
              objectFit="contain"
              width="200px"
            />
            <Stack direction="column" spacing="5px" w="100%">
              <Text fontSize="14px" color="">
                Nomor Telepon
              </Text>
              <Input
                placeholder="Masukkan nomor telepon anda"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
                type="tel"
                required
              ></Input>
            </Stack>
            <Stack direction="column" spacing="5px" w="100%">
              <Text fontSize="14px" color="">
                Password
              </Text>
              <Input
                placeholder="Masukkan password anda"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              ></Input>
            </Stack>
            <Button
              type="submit"
              variant="primary-solid-medium"
              width="100%"
              isLoading={isLoading}
            >
              Login
            </Button>
          </Stack>
        </form>
      </Center>
    </Container>
  );
}
