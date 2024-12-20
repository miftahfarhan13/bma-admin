import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Radio,
  RadioGroup,
  Select,
  SimpleGrid,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import DatePicker from "@/components/DatePicker";
import { Formik, Field, Form, FieldAttributes } from "formik";
import { fetchRegister, fetchUpdateUser } from "@/networks/auth";
import { useRouter } from "next/router";
import moment from "moment";
import useGetRoles from "@/utils/hooks/account/useGetRoles";
import useGetBusinessUsers from "@/utils/hooks/account/useGetBusinessUsers";
import UploadFile from "../AppComponents/UploadFile";
import { provinces } from "@/utils/provinces";

export default function CreateUpdateAccount({
  id,
  name,
  phoneNumber,
  email,
  role,
  businessUserId,
  depositNominal,
  depositDate,
  accountName,
  accountNumber,
  bankName,
  password,
  passwordConfirmation,
  isActive = "1",
  isDeposit = "0",
  savingBookUrl,
  proofTransferUrl,
  ktpUrl,
  type,
  provinceProps,
  cityProps,
}: {
  id?: string;
  name?: string;
  phoneNumber?: string;
  email?: string;
  role?: string;
  businessUserId?: string;
  depositNominal?: number;
  depositDate?: string;
  accountName?: string;
  accountNumber?: number;
  bankName?: string;
  password?: string;
  passwordConfirmation?: string;
  isActive?: string;
  isDeposit?: string;
  savingBookUrl?: string;
  proofTransferUrl?: string;
  ktpUrl?: string;
  type: string;
  provinceProps?: string;
  cityProps?: string;
}) {
  const router = useRouter();
  const toast = useToast();

  const { data: roles } = useGetRoles();
  const { data: businessUsers } = useGetBusinessUsers();

  const [date, setDate] = useState<Date | undefined>();
  const [statusActivation, setStatusActivation] = useState("1");
  const [statusDeposit, setStatusDeposit] = useState("0");
  const [accountRole, setAccountRole] = useState<string | undefined>("");
  const [accountBd, setAccountBd] = useState<string | undefined>("");
  const [imageSavingBook, setImageSavingBook] = useState<string | undefined>(
    ""
  );
  const [imageProofTransfer, setImageProofTransfer] = useState<
    string | undefined
  >("");
  const [imageKtp, setImagetKtp] = useState<string | undefined>("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    setStatusActivation(isActive);
    setStatusDeposit(isDeposit);
    setDate(depositDate ? new Date(depositDate || "") : undefined);
    setAccountRole(role);
    setImageSavingBook(savingBookUrl);
    setImageProofTransfer(proofTransferUrl);
    setImageProofTransfer(proofTransferUrl);
    setImagetKtp(ktpUrl);
    setAccountBd(businessUserId);
    setProvince(provinceProps || "");
    setCity(cityProps || "");
  }, [
    isActive,
    isDeposit,
    depositDate,
    role,
    savingBookUrl,
    proofTransferUrl,
    ktpUrl,
    businessUserId,
    cityProps,
    provinceProps,
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const register = async ({
    values,
    token,
    dateDeposit,
    roleId,
  }: {
    values: any;
    token: string;
    dateDeposit: string | undefined;
    roleId: number;
  }) => {
    await fetchRegister(
      {
        ...values,
        is_active: statusActivation === "1" ? true : false,
        is_deposit: statusDeposit === "1" ? true : false,
        deposit_date: dateDeposit,
        role: roleId,
        saving_book_url: imageSavingBook,
        proof_transfer_url: imageProofTransfer,
        ktp_url: imageKtp,
        account_business_id: parseInt(accountBd || ""),
        province,
        city,
      },
      token
    )
      .then((response) => {
        setIsLoading(false);
        router.push("/bd-performance");
      })
      .catch((error) => {
        const message = error?.response?.data?.message
          ? error?.response?.data?.message
          : error?.message;
        setIsLoading(false);
        toast({
          title: "Failed",
          description: message,
          status: "error",
          isClosable: true,
          position: "top",
        });
      });
  };

  const updateUser = async ({
    values,
    token,
    dateDeposit,
    roleId,
  }: {
    values: any;
    token: string;
    dateDeposit: string | undefined;
    roleId: number;
  }) => {
    await fetchUpdateUser(
      id,
      {
        ...values,
        is_active: statusActivation === "1" ? true : false,
        is_deposit: statusDeposit === "1" ? true : false,
        deposit_date: dateDeposit,
        role: roleId,
        saving_book_url: imageSavingBook,
        proof_transfer_url: imageProofTransfer,
        ktp_url: imageKtp,
        account_business_id: parseInt(accountBd || ""),
        province,
        city,
      },
      token
    )
      .then((response) => {
        setIsLoading(false);
        router.push("/bd-performance");
      })
      .catch((error) => {
        const message = error?.response?.data?.message
          ? error?.response?.data?.message
          : error?.message;
        setIsLoading(false);
        toast({
          title: "Failed",
          description: message,
          status: "error",
          isClosable: true,
          position: "top",
        });
      });
  };

  const onCreateUser = async (values: any) => {
    setIsLoading(true);
    const token = localStorage.getItem("token") || "";
    const dateDeposit = date
      ? moment(new Date(date || "")).format("YYYY-MM-DD")
      : undefined;
    const roleId = roles?.find((role: any) => role?.name === accountRole)?.id;

    if (type === "create") {
      register({ values, token, dateDeposit, roleId });
    } else {
      updateUser({ values, token, dateDeposit, roleId });
    }
  };
  return (
    <>
      <Formik
        initialValues={{
          name,
          phone_number: phoneNumber,
          email: email,
          role: role,
          deposit_nominal: depositNominal,
          deposit_date: depositDate,
          account_name: accountName,
          account_number: accountNumber,
          bank_name: bankName,
          password,
          password_confirmation: passwordConfirmation,
        }}
        onSubmit={async (values) => {
          await onCreateUser(values);
        }}
      >
        <Form>
          <Stack direction="column" spacing="20px">
            <Box p="10px" borderRadius="8px" border="1px solid #DBDBDB">
              <Stack direction="column" spacing="20px">
                <Text fontWeight="700">Info Akun</Text>
                <Stack direction="column" spacing="10px">
                  <Stack direction="column" spacing="5px">
                    <Text fontSize="14px" color="grey">
                      Nama
                    </Text>
                    <Field name="name">
                      {({ field }: FieldAttributes<any>) => (
                        <Input placeholder="Nama" {...field} required />
                      )}
                    </Field>
                  </Stack>
                  <SimpleGrid columns={[1, 1, 2, 2]} gap="10px">
                    <Stack direction="column" spacing="5px">
                      <Text fontSize="14px" color="grey">
                        No Handphone
                      </Text>
                      <Field name="phone_number">
                        {({ field }: FieldAttributes<any>) => (
                          <InputGroup>
                            <InputLeftElement pointerEvents="none">
                              <Icon icon="bx:phone" color="gray.300" />
                            </InputLeftElement>
                            <Input
                              type="tel"
                              placeholder="No Handphone"
                              required
                              {...field}
                            />
                          </InputGroup>
                        )}
                      </Field>
                    </Stack>
                    <Stack direction="column" spacing="5px">
                      <Text fontSize="14px" color="grey">
                        Email
                      </Text>
                      <Field name="email">
                        {({ field }: FieldAttributes<any>) => (
                          <InputGroup>
                            <InputLeftElement pointerEvents="none">
                              <Icon icon="bx:envelope" color="gray.300" />
                            </InputLeftElement>
                            <Input
                              type="email"
                              placeholder="Email"
                              {...field}
                              required
                            />
                          </InputGroup>
                        )}
                      </Field>
                    </Stack>
                  </SimpleGrid>
                  <Stack direction="column" spacing="5px">
                    <Text fontSize="14px" color="grey">
                      Role
                    </Text>
                    <Select
                      placeholder="Pilih Role"
                      value={accountRole}
                      onChange={(e) => setAccountRole(e.target.value)}
                      required
                    >
                      <option value="business">Business</option>
                      <option value="dealer">Dealer</option>
                      <option value="admin">Admin</option>
                    </Select>
                  </Stack>
                  {accountRole === "dealer" && (
                    <Stack direction="column" spacing="5px">
                      <Text fontSize="14px" color="grey">
                        Pilih BD
                      </Text>
                      <Select
                        placeholder="Pilih BD"
                        value={accountBd}
                        onChange={(e) => setAccountBd(e.target.value)}
                        required
                      >
                        {businessUsers?.map((user: any) => (
                          <option key={user?.id} value={user?.id}>
                            {user?.name}
                          </option>
                        ))}
                      </Select>
                    </Stack>
                  )}

                  <Stack direction="column" spacing="5px">
                    <Text fontSize="14px" color="grey">
                      Provinsi
                    </Text>
                    <Select
                      placeholder="Pilih Provinsi"
                      value={province}
                      onChange={(e) => {
                        setProvince(e.target.value);
                        setCity("");
                      }}
                      required
                    >
                      {provinces?.map((province, index) => (
                        <option
                          value={province?.provinsi}
                          key={`${province?.provinsi}-${index}`}
                        >
                          {province?.provinsi}
                        </option>
                      ))}
                    </Select>
                  </Stack>

                  <Stack direction="column" spacing="5px">
                    <Text fontSize="14px" color="grey">
                      Kota
                    </Text>
                    <Select
                      placeholder="Pilih Kota"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                    >
                      {provinces
                        ?.find((fil) => fil?.provinsi === province)
                        ?.kota?.map((item, index) => (
                          <option value={item} key={`${item}-${index}`}>
                            {item}
                          </option>
                        ))}
                    </Select>
                  </Stack>

                  <Stack direction="column" spacing="5px">
                    <Text fontSize="14px" color="grey">
                      Status Aktivasi
                    </Text>
                    <RadioGroup
                      onChange={setStatusActivation}
                      value={statusActivation}
                    >
                      <Stack direction="row" spacing="20px">
                        <Radio value="1" colorScheme="red">
                          Aktif
                        </Radio>
                        <Radio value="0" colorScheme="red">
                          Non-Aktif
                        </Radio>
                      </Stack>
                    </RadioGroup>
                  </Stack>
                </Stack>
              </Stack>
            </Box>
            {accountRole !== "business" ? (
              <>
                <Box p="10px" borderRadius="8px" border="1px solid #DBDBDB">
                  <Stack direction="column" spacing="10px">
                    <Text fontWeight="700">Info Deposit</Text>
                    <Stack direction="column" spacing="5px">
                      <Text fontSize="14px" color="grey">
                        Status Deposit
                      </Text>
                      <RadioGroup
                        onChange={setStatusDeposit}
                        value={statusDeposit}
                      >
                        <Stack direction="row" spacing="20px">
                          <Radio value="1" colorScheme="red">
                            Ya
                          </Radio>
                          <Radio value="0" colorScheme="red">
                            Tidak
                          </Radio>
                        </Stack>
                      </RadioGroup>
                    </Stack>
                    <SimpleGrid columns={[1, 1, 2, 2]} gap="10px">
                      <Stack direction="column" spacing="5px">
                        <Text fontSize="14px" color="grey">
                          Nominal Deposit
                        </Text>
                        <Field name="deposit_nominal">
                          {({ field }: FieldAttributes<any>) => (
                            <InputGroup>
                              <InputLeftElement pointerEvents="none">
                                Rp
                              </InputLeftElement>{" "}
                              <Input
                                type="number"
                                placeholder="Nominal Deposit"
                                onWheel={(e) => e.currentTarget.blur()}
                                required={statusDeposit === "1"}
                                {...field}
                              />
                            </InputGroup>
                          )}
                        </Field>
                      </Stack>
                      <Stack direction="column" spacing="5px">
                        <Text fontSize="14px" color="grey">
                          Tanggal Deposit
                        </Text>
                        <Box width="100%" zIndex="99">
                          <DatePicker
                            selected={date}
                            onChange={(event) => setDate(new Date(event || ""))}
                          />
                        </Box>
                      </Stack>
                    </SimpleGrid>
                    <Stack direction="column" spacing="5px">
                      <Text fontSize="14px" color="grey">
                        Nama Rekening
                      </Text>
                      <Field name="account_name">
                        {({ field }: FieldAttributes<any>) => (
                          <Input
                            type="text"
                            placeholder="Nama Rekening"
                            autoComplete="new-password"
                            {...field}
                          />
                        )}
                      </Field>
                    </Stack>
                    <Stack direction="column" spacing="5px">
                      <Text fontSize="14px" color="grey">
                        Nomor Rekening
                      </Text>
                      <Field name="account_number">
                        {({ field }: FieldAttributes<any>) => (
                          <Input
                            type="text"
                            placeholder="Nomor Rekening"
                            onWheel={(e) => e.currentTarget.blur()}
                            {...field}
                          />
                        )}
                      </Field>
                    </Stack>
                    <Stack direction="column" spacing="5px">
                      <Text fontSize="14px" color="grey">
                        Nama Bank
                      </Text>
                      <Field name="bank_name">
                        {({ field }: FieldAttributes<any>) => (
                          <Input
                            type="text"
                            placeholder="Nama Bank"
                            {...field}
                          />
                        )}
                      </Field>
                    </Stack>
                    <SimpleGrid columns={[1, 1, 2, 3]} gap="10px">
                      <Stack direction="column" spacing="5px">
                        <Text fontSize="14px" color="grey">
                          Foto Buku Tabungan
                        </Text>
                        <UploadFile
                          url={imageSavingBook || ""}
                          filePath="deposit"
                          onChangeValue={(value) => setImageSavingBook(value)}
                        />
                      </Stack>

                      <Stack direction="column" spacing="5px">
                        <Text fontSize="14px" color="grey">
                          Foto Bukti Transfer
                        </Text>
                        <UploadFile
                          url={imageProofTransfer || ""}
                          filePath="deposit"
                          onChangeValue={(value) =>
                            setImageProofTransfer(value)
                          }
                        />
                      </Stack>
                      <Stack direction="column" spacing="5px">
                        <Text fontSize="14px" color="grey">
                          Foto KTP
                        </Text>
                        <UploadFile
                          url={imageKtp || ""}
                          filePath="ktp"
                          onChangeValue={(value) => setImagetKtp(value)}
                        />
                      </Stack>
                    </SimpleGrid>
                  </Stack>
                </Box>
              </>
            ) : null}

            <Box p="10px" borderRadius="8px" border="1px solid #DBDBDB">
              <Stack direction="column" spacing="10px">
                <Text fontWeight="700">Password</Text>
                <Stack direction="column" spacing="5px">
                  <Text fontSize="14px" color="grey">
                    Password
                  </Text>
                  <Field name="password">
                    {({ field }: FieldAttributes<any>) => (
                      <Input
                        type="password"
                        placeholder="Password"
                        required={type === "create"}
                        autoComplete="new-password"
                        {...field}
                      />
                    )}
                  </Field>
                </Stack>
                <Stack direction="column" spacing="5px">
                  <Text fontSize="14px" color="grey">
                    Konfirmasi Password
                  </Text>
                  <Field name="password_confirmation">
                    {({ field }: FieldAttributes<any>) => (
                      <Input
                        type="password"
                        placeholder="Konfirmasi Password"
                        required={type === "create"}
                        {...field}
                      />
                    )}
                  </Field>
                </Stack>
              </Stack>
            </Box>
            <Button
              type="submit"
              variant="primary-solid-medium"
              isLoading={isLoading}
            >
              Submit
            </Button>
          </Stack>
        </Form>
      </Formik>
    </>
  );
}
