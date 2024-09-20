import {
  Box,
  Button,
  Center,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  SimpleGrid,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import TextEditor from "@/components/AppComponents/TextEditor";

import { useEffect, useState } from "react";
import { Formik, Field, Form, FieldAttributes } from "formik";
import { fetchRegister, fetchUpdateUser } from "@/networks/auth";
import { useRouter } from "next/router";
import UploadFile from "../AppComponents/UploadFile";
import useGetBrands from "@/utils/hooks/brand/useGetBrands";
import { Icon } from "@iconify/react/dist/iconify.js";

interface ICarDefect {
  defect_title: string;
  defect_pict: string;
  defect_type: string;
}

export default function CreateUpdateCar({
  id,
  brand_id,
  carName,
  carAvailability,
  price,
  currentPrice,
  licensePlate,
  odometer,
  manufactureYear,
  carTax,
  fuelType,
  transmissionType,
  defectStatus,
  isFlooded = "0",
  auctionDate,
  bpkbStatus = "0",
  stnkStatus = "0",
  invoiceStatus = "0",
  vinStatus = "0",
  formAStatus = "0",
  stnkFotocopyStatus = "0",
  manualBookStatus = "0",
  serviceBookStatus = "0",
  backupKeyStatus = "0",
  receiptFormStatus = "0",
  declarationRightStatus = "0",
  toolkitStatus = "0",
  videoFile,

  imgPathsProps,
  statusProps,
  inspectionDetailProps,
  bpkbPictProps,
  stnkPictProps,
  invoicePictProps,
  vinPictProps,
  formAPictProps,
  stnkFotocopyPictProps,
  manualBookPictProps,
  serviceBookPictProps,
  backupKeyPictProps,
  receiptFormPictProps,
  declarationRightPictProps,
  toolkitPictProps,
  carDefectsInteriorProps,
  carDefectsEksteriorProps,
  carDefectsOthersProps,

  type,
}: {
  id?: string;
  brand_id?: string;
  carName?: string;
  carAvailability?: string;
  price?: string;
  currentPrice?: string;
  licensePlate?: string;
  odometer?: number;
  manufactureYear?: string;
  carTax?: string;
  fuelType?: number;
  transmissionType?: string;
  defectStatus?: string;
  isFlooded?: string;
  auctionDate?: string;
  bpkbStatus?: string;
  stnkStatus?: string;
  invoiceStatus?: string;
  vinStatus?: string;
  formAStatus?: string;
  stnkFotocopyStatus?: string;
  manualBookStatus?: string;
  serviceBookStatus?: string;
  backupKeyStatus?: string;
  receiptFormStatus?: string;
  declarationRightStatus?: string;
  toolkitStatus?: string;
  videoFile?: string;

  imgPathsProps?: Array<string | undefined>;
  statusProps?: string;
  inspectionDetailProps?: string;
  bpkbPictProps?: string;
  stnkPictProps?: string;
  invoicePictProps?: string;
  vinPictProps?: string;
  formAPictProps?: string;
  stnkFotocopyPictProps?: string;
  manualBookPictProps?: string;
  serviceBookPictProps?: string;
  backupKeyPictProps?: string;
  receiptFormPictProps?: string;
  declarationRightPictProps?: string;
  toolkitPictProps?: string;
  carDefectsInteriorProps?: Array<ICarDefect>;
  carDefectsEksteriorProps?: Array<ICarDefect>;
  carDefectsOthersProps?: Array<ICarDefect>;

  type: string;
}) {
  const router = useRouter();
  const toast = useToast();

  const { data: brands } = useGetBrands();

  const [imgPaths, setImgPaths] = useState<Array<string | undefined>>([]);
  const [status, setStatus] = useState("");
  const [inspectionDetail, setInspectionDetail] = useState("");
  const [bpkbPict, setBpkbPict] = useState<string | undefined>("");
  const [stnkPict, setStnkPict] = useState<string | undefined>("");
  const [invoicePict, setInvoicePict] = useState<string | undefined>("");
  const [vinPict, setVinPict] = useState<string | undefined>("");
  const [formAPict, setFormAPict] = useState<string | undefined>("");
  const [stnkFotocopyPict, setStnkFotocopyPict] = useState<string | undefined>(
    ""
  );
  const [manualBookPict, setManualBookPict] = useState<string | undefined>("");
  const [serviceBookPict, setServiceBookPict] = useState<string | undefined>(
    ""
  );
  const [backupKeyPict, setBackupKeyPict] = useState<string | undefined>("");
  const [receiptFormPict, setReceiptFormPict] = useState<string | undefined>(
    ""
  );
  const [declarationRightPict, setDeclarationRightPict] = useState<
    string | undefined
  >("");
  const [toolkitPict, setToolkitPict] = useState<string | undefined>("");
  const [carDefectsInterior, setCarDefectsInterior] = useState<
    Array<ICarDefect>
  >([]);
  const [carDefectsEksterior, setCarDefectsEksterior] = useState<
    Array<ICarDefect>
  >([]);
  const [carDefectsOthers, setCarDefectsOthers] = useState<Array<ICarDefect>>(
    []
  );

  useEffect(() => {
    setStatus(statusProps || "");
    setImgPaths(imgPathsProps || []);
    setInspectionDetail(inspectionDetailProps || "");
    setBpkbPict(bpkbPictProps);
    setStnkPict(stnkPictProps);
    setInvoicePict(invoicePictProps);
    setVinPict(vinPictProps);
    setFormAPict(formAPictProps);
    setStnkFotocopyPict(stnkFotocopyPictProps);
    setManualBookPict(manualBookPictProps);
    setServiceBookPict(serviceBookPictProps);
    setBackupKeyPict(backupKeyPictProps);
    setReceiptFormPict(receiptFormPictProps);
    setDeclarationRightPict(declarationRightPictProps);
    setToolkitPict(toolkitPictProps);
    setCarDefectsInterior(carDefectsInteriorProps || []);
    setCarDefectsEksterior(carDefectsEksteriorProps || []);
    setCarDefectsOthers(carDefectsOthersProps || []);
  }, [
    imgPathsProps,
    statusProps,
    inspectionDetailProps,
    bpkbPictProps,
    stnkPictProps,
    invoicePictProps,
    vinPictProps,
    formAPictProps,
    stnkFotocopyPictProps,
    manualBookPictProps,
    serviceBookPictProps,
    backupKeyPictProps,
    receiptFormPictProps,
    declarationRightPictProps,
    toolkitPictProps,
    carDefectsInteriorProps,
    carDefectsEksteriorProps,
    carDefectsOthersProps,
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const createCar = async ({
    values,
    token,
  }: {
    values: any;
    token: string;
  }) => {
    await fetchRegister(
      {
        ...values,
        inspection_detail: inspectionDetail,
        bpkb_pict: bpkbPict,
        stnk_pict: stnkPict,
        invoice_pict: invoicePict,
        vin_pict: vinPict,
        form_a_pict: formAPict,
        stnk_fotocopy_pict: stnkFotocopyPict,
        manual_book_pict: manualBookPict,
        service_book_pict: serviceBookPict,
        backup_key_pict: backupKeyPict,
        receipt_form_pict: receiptFormPict,
        declaration_right_pict: declarationRightPict,
        toolkit_pict: toolkitPict,
        img_paths: imgPaths,
        car_defects_interior: carDefectsInterior,
        car_defects_eksterior: carDefectsEksterior,
        car_defects_others: carDefectsOthers,
      },
      token
    )
      .then((response) => {
        setIsLoading(false);
        router.push("/car");
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

  const updateCar = async ({
    values,
    token,
  }: {
    values: any;
    token: string;
  }) => {
    await fetchUpdateUser(
      id,
      {
        ...values,
        inspection_detail: inspectionDetail,
        bpkb_pict: bpkbPict,
        stnk_pict: stnkPict,
        invoice_pict: invoicePict,
        vin_pict: vinPict,
        form_a_pict: formAPict,
        stnk_fotocopy_pict: stnkFotocopyPict,
        manual_book_pict: manualBookPict,
        service_book_pict: serviceBookPict,
        backup_key_pict: backupKeyPict,
        receipt_form_pict: receiptFormPict,
        declaration_right_pict: declarationRightPict,
        toolkit_pict: toolkitPict,
        img_paths: imgPaths,
        car_defects_interior: carDefectsInterior,
        car_defects_eksterior: carDefectsEksterior,
        car_defects_others: carDefectsOthers,
        status,
      },
      token
    )
      .then((response) => {
        setIsLoading(false);
        router.push("/car");
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

  const onCreateCar = async (values: any) => {
    setIsLoading(true);
    const token = localStorage.getItem("token") || "";

    if (type === "create") {
      createCar({ values, token });
    } else {
      updateCar({ values, token });
    }
  };

  const handleAddImgPaths = () => {
    setImgPaths([...imgPaths, ""]);
  };

  const handleChangeImgPaths = (index: number, value: string) => {
    const temp = [...imgPaths];
    temp[index] = value;
    setImgPaths(temp);
  };

  const handleRemoveImgPaths = (index: any) => {
    const values = [...imgPaths];
    values.splice(index, 1);
    setImgPaths(values);
  };

  const handleAddCarDefectsInterior = () => {
    setCarDefectsInterior([
      ...carDefectsInterior,
      { defect_title: "", defect_pict: "", defect_type: "Interior" },
    ]);
  };

  const handleChangeCarDefectsInterior = ({
    index,
    value,
    type,
  }: {
    index: number;
    value: string;
    type: string;
  }) => {
    const temp = [...carDefectsInterior];
    if (type === "defect_title") temp[index].defect_title = value;
    else if (type === "defect_pict") temp[index].defect_pict = value;
    setCarDefectsInterior(temp);
  };

  const handleRemoveCarDefectsInterior = (index: any) => {
    const values = [...carDefectsInterior];
    values.splice(index, 1);
    setCarDefectsInterior(values);
  };

  const handleAddCarDefectsEksterior = () => {
    setCarDefectsEksterior([
      ...carDefectsEksterior,
      { defect_title: "", defect_pict: "", defect_type: "Eksterior" },
    ]);
  };

  const handleChangeCarDefectsEksterior = ({
    index,
    value,
    type,
  }: {
    index: number;
    value: string;
    type: string;
  }) => {
    const temp = [...carDefectsEksterior];
    if (type === "defect_title") temp[index].defect_title = value;
    else if (type === "defect_pict") temp[index].defect_pict = value;
    setCarDefectsEksterior(temp);
  };

  const handleRemoveCarDefectsEksterior = (index: any) => {
    const values = [...carDefectsEksterior];
    values.splice(index, 1);
    setCarDefectsEksterior(values);
  };

  const handleAddCarDefectsOther = () => {
    setCarDefectsOthers([
      ...carDefectsOthers,
      { defect_title: "", defect_pict: "", defect_type: "Others" },
    ]);
  };

  const handleChangeCarDefectsOther = ({
    index,
    value,
    type,
  }: {
    index: number;
    value: string;
    type: string;
  }) => {
    const temp = [...carDefectsOthers];
    if (type === "defect_title") temp[index].defect_title = value;
    else if (type === "defect_pict") temp[index].defect_pict = value;
    setCarDefectsOthers(temp);
  };

  const handleRemoveCarDefectsOther = (index: any) => {
    const values = [...carDefectsOthers];
    values.splice(index, 1);
    setCarDefectsOthers(values);
  };
  return (
    <>
      <Formik
        initialValues={{
          brand_id: brand_id || "",
          car_name: carName || "",
          car_availability: carAvailability || "",
          price: price || "",
          current_price: currentPrice || "",
          license_plate: licensePlate || "",
          odometer: odometer || "",
          manufacture_year: manufactureYear || "",
          car_tax: carTax || "",
          fuel_type: fuelType || "",
          transmission_type: transmissionType || "",
          defect_status: defectStatus || "",
          is_flooded: isFlooded || "0",
          auction_date: auctionDate || "",
          auction_session_run: "10:00 - 15:00",
          bpkb_status: bpkbStatus || "0",
          stnk_status: stnkStatus || "0",
          invoice_status: invoiceStatus || "0",
          vin_status: vinStatus || "0",
          form_a_status: formAStatus || "0",
          stnk_fotocopy_status: stnkFotocopyStatus || "0",
          manual_book_status: manualBookStatus || "0",
          service_book_status: serviceBookStatus || "0",
          backup_key_status: backupKeyStatus || "0",
          receipt_form_status: receiptFormStatus || "0",
          declaration_right_status: declarationRightStatus || "0",
          toolkit_status: toolkitStatus || "0",
          video_file: videoFile || "",
        }}
        onSubmit={async (values) => {
          await onCreateCar(values);
        }}
      >
        <Form>
          <Stack direction="column" spacing="20px">
            <Box p="10px" borderRadius="8px" border="1px solid #DBDBDB">
              <Stack direction="column" spacing="20px">
                <Text fontWeight="700" fontSize="18px">
                  Detail Car
                </Text>
                <Stack direction="column" spacing="10px">
                  <Stack direction="column" spacing="5px">
                    <Text fontSize="14px" color="grey">
                      Merek Mobil
                    </Text>
                    <Field name="brand_id">
                      {({ field }: FieldAttributes<any>) => (
                        <Select
                          placeholder="Pilih Merek Mobil"
                          required
                          {...field}
                        >
                          {brands?.map((brand: any) => (
                            <option key={brand?.id} value={brand?.id}>
                              {brand?.brand_name}
                            </option>
                          ))}
                        </Select>
                      )}
                    </Field>
                  </Stack>
                  <SimpleGrid columns={[1, 1, 2, 2]} gap="10px">
                    <Stack direction="column" spacing="5px">
                      <Text fontSize="14px" color="grey">
                        Nama Mobil
                      </Text>
                      <Field name="car_name">
                        {({ field }: FieldAttributes<any>) => (
                          <Input placeholder="Nama Mobil" {...field} required />
                        )}
                      </Field>
                    </Stack>

                    <Stack direction="column" spacing="5px">
                      <Text fontSize="14px" color="grey">
                        Ketersediaan Mobil
                      </Text>
                      <Field name="car_availability">
                        {({ field }: FieldAttributes<any>) => (
                          <Select
                            placeholder="Pilih Ketersediaan Mobil"
                            required
                            {...field}
                          >
                            <option value="Ready Stock">Ready Stock</option>
                            <option value="SA Cars">SA Cars</option>
                            <option value="Customer">Customer</option>
                            <option value="Corporate">Corporate</option>
                          </Select>
                        )}
                      </Field>
                    </Stack>
                  </SimpleGrid>

                  <SimpleGrid columns={[1, 1, 2, 2]} gap="10px">
                    <Stack direction="column" spacing="5px">
                      <Text fontSize="14px" color="grey">
                        Harga Open
                      </Text>
                      <Field name="price">
                        {({ field }: FieldAttributes<any>) => (
                          <InputGroup>
                            <InputLeftElement pointerEvents="none">
                              Rp
                            </InputLeftElement>
                            <Input
                              type="number"
                              placeholder="Harga Open"
                              required
                              onWheel={(e) => e.currentTarget.blur()}
                              {...field}
                            />
                          </InputGroup>
                        )}
                      </Field>
                    </Stack>
                    <Stack direction="column" spacing="5px">
                      <Text fontSize="14px" color="grey">
                        Harga Buy Now
                      </Text>
                      <Field name="current_price">
                        {({ field }: FieldAttributes<any>) => (
                          <InputGroup>
                            <InputLeftElement pointerEvents="none">
                              Rp
                            </InputLeftElement>
                            <Input
                              type="number"
                              placeholder="Harga Buy Now"
                              required
                              onWheel={(e) => e.currentTarget.blur()}
                              {...field}
                            />
                          </InputGroup>
                        )}
                      </Field>
                    </Stack>
                  </SimpleGrid>

                  <SimpleGrid columns={[1, 1, 2, 2]} gap="10px">
                    <Stack direction="column" spacing="5px">
                      <Text fontSize="14px" color="grey">
                        Plat Nomor
                      </Text>
                      <Field name="license_plate">
                        {({ field }: FieldAttributes<any>) => (
                          <Input
                            placeholder="Plat Nomor Mobil"
                            {...field}
                            required
                          />
                        )}
                      </Field>
                    </Stack>

                    <Stack direction="column" spacing="5px">
                      <Text fontSize="14px" color="grey">
                        Kilometer
                      </Text>
                      <Field name="odometer">
                        {({ field }: FieldAttributes<any>) => (
                          <Input
                            type="number"
                            placeholder="Kilometer Mobil"
                            onWheel={(e) => e.currentTarget.blur()}
                            {...field}
                            required
                          />
                        )}
                      </Field>
                    </Stack>
                  </SimpleGrid>

                  <SimpleGrid columns={[1, 1, 2, 2]} gap="10px">
                    <Stack direction="column" spacing="5px">
                      <Text fontSize="14px" color="grey">
                        Tahun Mobil
                      </Text>
                      <Field name="manufacture_year">
                        {({ field }: FieldAttributes<any>) => (
                          <Input
                            type="date"
                            placeholder="Tahun Mobil"
                            {...field}
                            required
                          />
                        )}
                      </Field>
                    </Stack>

                    <Stack direction="column" spacing="5px">
                      <Text fontSize="14px" color="grey">
                        Pajak Mobil
                      </Text>
                      <Field name="car_tax">
                        {({ field }: FieldAttributes<any>) => (
                          <Input
                            type="date"
                            placeholder="Pajak Mobil"
                            {...field}
                            required
                          />
                        )}
                      </Field>
                    </Stack>
                  </SimpleGrid>

                  <SimpleGrid columns={[1, 1, 2, 2]} gap="10px">
                    <Stack direction="column" spacing="5px">
                      <Text fontSize="14px" color="grey">
                        Bahan Bakar
                      </Text>
                      <Field name="fuel_type">
                        {({ field }: FieldAttributes<any>) => (
                          <Select
                            placeholder="Pilih Bahan Bakar"
                            required
                            {...field}
                          >
                            <option value="Bensin">Bensin</option>
                            <option value="Solar">Solar</option>
                            <option value="Hybrid">Hybrid</option>
                            <option value="EV">EV</option>
                          </Select>
                        )}
                      </Field>
                    </Stack>

                    <Stack direction="column" spacing="5px">
                      <Text fontSize="14px" color="grey">
                        Transmisi
                      </Text>
                      <Field name="transmission_type">
                        {({ field }: FieldAttributes<any>) => (
                          <Select
                            placeholder="Pilih Transmisi"
                            required
                            {...field}
                          >
                            <option value="AT">AT</option>
                            <option value="MT">MT</option>
                          </Select>
                        )}
                      </Field>
                    </Stack>
                  </SimpleGrid>

                  <SimpleGrid columns={[1, 1, 2, 2]} gap="10px">
                    <Stack direction="column" spacing="5px">
                      <Text fontSize="14px" color="grey">
                        Status Kerusakan Tabrakan
                      </Text>
                      <Field name="defect_status">
                        {({ field }: FieldAttributes<any>) => (
                          <Select
                            placeholder="Pilih Status Kerusakan Tabrakan"
                            required
                            {...field}
                          >
                            <option value="Tidak Ada">Tidak Ada</option>
                            <option value="Ringan">Ringan</option>
                            <option value="Sedang">Sedang</option>
                            <option value="Berat">Berat</option>
                          </Select>
                        )}
                      </Field>
                    </Stack>

                    <Stack direction="column" spacing="5px">
                      <Text fontSize="14px" color="grey">
                        Status Kerusakan Banjir
                      </Text>
                      <Field name="is_flooded">
                        {({ field }: FieldAttributes<any>) => (
                          <Select
                            placeholder="Pilih Kerusakan Banjir"
                            required
                            {...field}
                          >
                            <option value="0">Tidak</option>
                            <option value="1">Ya</option>
                          </Select>
                        )}
                      </Field>
                    </Stack>
                  </SimpleGrid>

                  <SimpleGrid columns={[1, 1, 2, 2]} gap="10px">
                    <Stack direction="column" spacing="5px">
                      <Text fontSize="14px" color="grey">
                        Tanggal Lelang
                      </Text>
                      <Field name="auction_date">
                        {({ field }: FieldAttributes<any>) => (
                          <Input
                            type="date"
                            placeholder="Tanggal Lelang"
                            {...field}
                            required
                          />
                        )}
                      </Field>
                    </Stack>

                    <Stack direction="column" spacing="5px">
                      <Text fontSize="14px" color="grey">
                        Sesi Lelang
                      </Text>
                      <Field name="auction_session_run">
                        {({ field }: FieldAttributes<any>) => (
                          <Input
                            placeholder="Sesi Lelang"
                            {...field}
                            readOnly
                          />
                        )}
                      </Field>
                    </Stack>
                  </SimpleGrid>
                </Stack>
              </Stack>
            </Box>

            <Box p="10px" borderRadius="8px" border="1px solid #DBDBDB">
              <Stack direction="column" spacing="20px">
                <Stack
                  direction="row"
                  alignItems="start"
                  justifyContent="space-between"
                >
                  <Text fontWeight="700" fontSize="18px">
                    Foto Mobil
                  </Text>
                  <Button
                    variant="primary-solid-small"
                    leftIcon={<Icon icon="bx:plus" />}
                    onClick={handleAddImgPaths}
                  >
                    Tambah Foto
                  </Button>
                </Stack>

                {imgPaths && imgPaths?.length > 0 ? (
                  <>
                    <SimpleGrid columns={[1, 1, 2, 6]} gap="10px">
                      {imgPaths?.map((imgPath, index) => (
                        <Box position="relative">
                          <UploadFile
                            url={imgPath || ""}
                            onChangeValue={(value) =>
                              handleChangeImgPaths(index, value)
                            }
                            filePath="img_path"
                          />

                          <IconButton
                            aria-label="Icon Delete File"
                            position="absolute"
                            top={-2}
                            right={-1}
                            onClick={() => handleRemoveImgPaths(index)}
                            icon={<Icon icon="bx:x" fontSize="24px" />}
                            size="sm"
                            bgColor="bma.primary"
                            color="white"
                            _hover={{}}
                          ></IconButton>
                        </Box>
                      ))}
                    </SimpleGrid>
                  </>
                ) : (
                  <>
                    <Center h="80px" bgColor="#e3e4e6" borderRadius="8px">
                      Belum ada foto mobil, klik tombol Tambah Foto untuk
                      mengupload foto
                    </Center>
                  </>
                )}
              </Stack>
            </Box>

            <Box p="10px" borderRadius="8px" border="1px solid #DBDBDB">
              <Stack direction="column" spacing="20px">
                <Text fontWeight="700" fontSize="18px">
                  Dokumen Mobil
                </Text>

                <SimpleGrid columns={[1, 1, 2, 2]} gap="10px">
                  <Stack direction="column" spacing="5px">
                    <Text fontSize="14px" color="grey">
                      BPKB
                    </Text>
                    <Field name="bpkb_status">
                      {({ field }: FieldAttributes<any>) => (
                        <Select
                          placeholder="Pilih status BPKB"
                          required
                          {...field}
                        >
                          <option value="0">Leasing</option>
                          <option value="1">Ada</option>
                        </Select>
                      )}
                    </Field>
                  </Stack>

                  <Stack direction="column" spacing="5px">
                    <Text fontSize="14px" color="grey">
                      STNK
                    </Text>
                    <Field name="stnk_status">
                      {({ field }: FieldAttributes<any>) => (
                        <Select
                          placeholder="Pilih Status STNK"
                          required
                          {...field}
                        >
                          <option value="0">Tidak ada</option>
                          <option value="1">Ada</option>
                        </Select>
                      )}
                    </Field>
                  </Stack>

                  <Stack direction="column" spacing="5px">
                    <Text fontSize="14px" color="grey">
                      Faktur
                    </Text>
                    <Field name="invoice_status">
                      {({ field }: FieldAttributes<any>) => (
                        <Select
                          placeholder="Pilih status faktur"
                          required
                          {...field}
                        >
                          <option value="0">Tidak ada</option>
                          <option value="1">Ada</option>
                        </Select>
                      )}
                    </Field>
                  </Stack>

                  <Stack direction="column" spacing="5px">
                    <Text fontSize="14px" color="grey">
                      NIK/VIN
                    </Text>
                    <Field name="vin_status">
                      {({ field }: FieldAttributes<any>) => (
                        <Select
                          placeholder="Pilih Status NIK/VIN"
                          required
                          {...field}
                        >
                          <option value="0">Tidak ada</option>
                          <option value="1">Ada</option>
                        </Select>
                      )}
                    </Field>
                  </Stack>

                  <Stack direction="column" spacing="5px">
                    <Text fontSize="14px" color="grey">
                      Form A (CBU)
                    </Text>
                    <Field name="form_a_status">
                      {({ field }: FieldAttributes<any>) => (
                        <Select
                          placeholder="Pilih status Form A (CBU)"
                          required
                          {...field}
                        >
                          <option value="0">Tidak ada</option>
                          <option value="1">Ada</option>
                        </Select>
                      )}
                    </Field>
                  </Stack>

                  <Stack direction="column" spacing="5px">
                    <Text fontSize="14px" color="grey">
                      FC an STNK
                    </Text>
                    <Field name="stnk_fotocopy_status">
                      {({ field }: FieldAttributes<any>) => (
                        <Select
                          placeholder="Pilih Status FC an STNK"
                          required
                          {...field}
                        >
                          <option value="0">Tidak ada</option>
                          <option value="1">Ada</option>
                        </Select>
                      )}
                    </Field>
                  </Stack>

                  <Stack direction="column" spacing="5px">
                    <Text fontSize="14px" color="grey">
                      Buku Manual
                    </Text>
                    <Field name="manual_book_status">
                      {({ field }: FieldAttributes<any>) => (
                        <Select
                          placeholder="Pilih status Buku Manual"
                          required
                          {...field}
                        >
                          <option value="0">Tidak ada</option>
                          <option value="1">Ada</option>
                        </Select>
                      )}
                    </Field>
                  </Stack>

                  <Stack direction="column" spacing="5px">
                    <Text fontSize="14px" color="grey">
                      Buku Servis
                    </Text>
                    <Field name="service_book_status">
                      {({ field }: FieldAttributes<any>) => (
                        <Select
                          placeholder="Pilih Status Buku Servis"
                          required
                          {...field}
                        >
                          <option value="0">Tidak ada</option>
                          <option value="1">Ada</option>
                        </Select>
                      )}
                    </Field>
                  </Stack>

                  <Stack direction="column" spacing="5px">
                    <Text fontSize="14px" color="grey">
                      Kunci Cadangan
                    </Text>
                    <Field name="backup_key_status">
                      {({ field }: FieldAttributes<any>) => (
                        <Select
                          placeholder="Pilih status Kunci Cadangan"
                          required
                          {...field}
                        >
                          <option value="0">Tidak ada</option>
                          <option value="1">Ada</option>
                        </Select>
                      )}
                    </Field>
                  </Stack>

                  <Stack direction="column" spacing="5px">
                    <Text fontSize="14px" color="grey">
                      Blanko Kwitansi
                    </Text>
                    <Field name="receipt_form_status">
                      {({ field }: FieldAttributes<any>) => (
                        <Select
                          placeholder="Pilih Status Blanko Kwitansi"
                          required
                          {...field}
                        >
                          <option value="0">Tidak ada</option>
                          <option value="1">Ada</option>
                        </Select>
                      )}
                    </Field>
                  </Stack>

                  <Stack direction="column" spacing="5px">
                    <Text fontSize="14px" color="grey">
                      SPH
                    </Text>
                    <Field name="declaration_right_status">
                      {({ field }: FieldAttributes<any>) => (
                        <Select
                          placeholder="Pilih status SPH"
                          required
                          {...field}
                        >
                          <option value="0">Tidak ada</option>
                          <option value="1">Ada</option>
                        </Select>
                      )}
                    </Field>
                  </Stack>

                  <Stack direction="column" spacing="5px">
                    <Text fontSize="14px" color="grey">
                      Toolkits
                    </Text>
                    <Field name="toolkit_status">
                      {({ field }: FieldAttributes<any>) => (
                        <Select
                          placeholder="Pilih Status Toolkits"
                          required
                          {...field}
                        >
                          <option value="0">Tidak ada</option>
                          <option value="1">Ada</option>
                        </Select>
                      )}
                    </Field>
                  </Stack>
                </SimpleGrid>

                <SimpleGrid columns={[1, 1, 2, 6]} gap="10px">
                  <Stack direction="column" spacing="5px">
                    <Text fontSize="14px" color="grey">
                      Gambar BPKB
                    </Text>
                    <UploadFile
                      url={bpkbPict || ""}
                      onChangeValue={(value) => setBpkbPict(value)}
                      filePath="car_documents/bpkb"
                    />
                  </Stack>

                  <Stack direction="column" spacing="5px">
                    <Text fontSize="14px" color="grey">
                      Gambar STNK
                    </Text>
                    <UploadFile
                      url={stnkPict || ""}
                      onChangeValue={(value) => setStnkPict(value)}
                      filePath="car_documents/stnk"
                    />
                  </Stack>

                  <Stack direction="column" spacing="5px">
                    <Text fontSize="14px" color="grey">
                      Gambar Faktur
                    </Text>
                    <UploadFile
                      url={invoicePict || ""}
                      onChangeValue={(value) => setInvoicePict(value)}
                      filePath="car_documents/invoice"
                    />
                  </Stack>

                  <Stack direction="column" spacing="5px">
                    <Text fontSize="14px" color="grey">
                      Gambar NIK/VIN
                    </Text>
                    <UploadFile
                      url={vinPict || ""}
                      onChangeValue={(value) => setVinPict(value)}
                      filePath="car_documents/vin"
                    />
                  </Stack>

                  <Stack direction="column" spacing="5px">
                    <Text fontSize="14px" color="grey">
                      Gambar Form A (CBU)
                    </Text>
                    <UploadFile
                      url={formAPict || ""}
                      onChangeValue={(value) => setFormAPict(value)}
                      filePath="car_documents/form_a"
                    />
                  </Stack>

                  <Stack direction="column" spacing="5px">
                    <Text fontSize="14px" color="grey">
                      Gambar FC an STNK
                    </Text>
                    <UploadFile
                      url={stnkFotocopyPict || ""}
                      onChangeValue={(value) => setStnkFotocopyPict(value)}
                      filePath="car_documents/stnk_fotocopy"
                    />
                  </Stack>

                  <Stack direction="column" spacing="5px">
                    <Text fontSize="14px" color="grey">
                      Gambar Buku Manual
                    </Text>
                    <UploadFile
                      url={manualBookPict || ""}
                      onChangeValue={(value) => setManualBookPict(value)}
                      filePath="car_documents/manual_book"
                    />
                  </Stack>

                  <Stack direction="column" spacing="5px">
                    <Text fontSize="14px" color="grey">
                      Gambar Buku Servis
                    </Text>
                    <UploadFile
                      url={serviceBookPict || ""}
                      onChangeValue={(value) => setServiceBookPict(value)}
                      filePath="car_documents/service_book"
                    />
                  </Stack>

                  <Stack direction="column" spacing="5px">
                    <Text fontSize="14px" color="grey">
                      Gambar Kunci Cadangan
                    </Text>
                    <UploadFile
                      url={backupKeyPict || ""}
                      onChangeValue={(value) => setBackupKeyPict(value)}
                      filePath="car_documents/backup_key"
                    />
                  </Stack>

                  <Stack direction="column" spacing="5px">
                    <Text fontSize="14px" color="grey">
                      Gambar Blanko Kwitansi
                    </Text>
                    <UploadFile
                      url={receiptFormPict || ""}
                      onChangeValue={(value) => setReceiptFormPict(value)}
                      filePath="car_documents/receipt_form"
                    />
                  </Stack>

                  <Stack direction="column" spacing="5px">
                    <Text fontSize="14px" color="grey">
                      Gambar SPH
                    </Text>
                    <UploadFile
                      url={declarationRightPict || ""}
                      onChangeValue={(value) => setDeclarationRightPict(value)}
                      filePath="car_documents/declaration_right"
                    />
                  </Stack>

                  <Stack direction="column" spacing="5px">
                    <Text fontSize="14px" color="grey">
                      Gambar Toolkits
                    </Text>
                    <UploadFile
                      url={toolkitPict || ""}
                      onChangeValue={(value) => setToolkitPict(value)}
                      filePath="car_documents/toolkit"
                    />
                  </Stack>
                </SimpleGrid>
              </Stack>
            </Box>

            <Box p="10px" borderRadius="8px" border="1px solid #DBDBDB">
              <Stack direction="column" spacing="20px">
                <Text fontWeight="700" fontSize="18px">
                  Laporan Inspeksi
                </Text>

                <Stack direction="column" spacing="5px">
                  <Text fontSize="14px" color="grey">
                    Detail Keterangan Inspeksi
                  </Text>

                  <TextEditor
                    isLimited
                    data={inspectionDetail}
                    onChangeValue={(description: string) => {
                      setInspectionDetail(description);
                    }}
                  />
                </Stack>
              </Stack>
            </Box>

            <Box p="10px" borderRadius="8px" border="1px solid #DBDBDB">
              <Stack direction="column" spacing="20px">
                <Text fontWeight="700" fontSize="18px">
                  Kerusakan Mobil
                </Text>

                <Stack direction="column" spacing="10px">
                  <Stack
                    direction="row"
                    alignItems="start"
                    justifyContent="space-between"
                  >
                    <Text fontWeight="700" fontSize="18px">
                      Interior
                    </Text>
                    <Button
                      variant="primary-solid-small"
                      leftIcon={<Icon icon="bx:plus" />}
                      onClick={handleAddCarDefectsInterior}
                    >
                      Tambah Foto
                    </Button>
                  </Stack>

                  {carDefectsInterior && carDefectsInterior?.length > 0 ? (
                    <>
                      <SimpleGrid columns={[1, 1, 2, 6]} gap="10px">
                        {carDefectsInterior?.map((interior, index) => (
                          <Box position="relative">
                            <Stack direction="column" spacing="10px">
                              <UploadFile
                                url={interior?.defect_pict || ""}
                                onChangeValue={(value) =>
                                  handleChangeCarDefectsInterior({
                                    index,
                                    value,
                                    type: "defect_pict",
                                  })
                                }
                                filePath="img_path"
                              />
                              <Input
                                placeholder="Judul Defect Interior"
                                value={interior?.defect_title}
                                onChange={(e) =>
                                  handleChangeCarDefectsInterior({
                                    index,
                                    value: e.target.value,
                                    type: "defect_title",
                                  })
                                }
                              ></Input>
                            </Stack>

                            <IconButton
                              aria-label="Icon Delete File"
                              position="absolute"
                              top={-2}
                              right={-1}
                              onClick={() =>
                                handleRemoveCarDefectsInterior(index)
                              }
                              icon={<Icon icon="bx:x" fontSize="24px" />}
                              size="sm"
                              bgColor="bma.primary"
                              color="white"
                              _hover={{}}
                            ></IconButton>
                          </Box>
                        ))}
                      </SimpleGrid>
                    </>
                  ) : (
                    <>
                      <Center h="80px" bgColor="#e3e4e6" borderRadius="8px">
                        Belum ada foto defect interior, klik tombol Tambah Foto
                        untuk mengupload foto
                      </Center>
                    </>
                  )}
                </Stack>

                <Stack direction="column" spacing="20px">
                  <Stack
                    direction="row"
                    alignItems="start"
                    justifyContent="space-between"
                  >
                    <Text fontWeight="700" fontSize="18px">
                      Eksterior
                    </Text>
                    <Button
                      variant="primary-solid-small"
                      leftIcon={<Icon icon="bx:plus" />}
                      onClick={handleAddCarDefectsEksterior}
                    >
                      Tambah Foto
                    </Button>
                  </Stack>

                  {carDefectsEksterior && carDefectsEksterior?.length > 0 ? (
                    <>
                      <SimpleGrid columns={[1, 1, 2, 6]} gap="10px">
                        {carDefectsEksterior?.map((interior, index) => (
                          <Box position="relative">
                            <Stack direction="column" spacing="10px">
                              <UploadFile
                                url={interior?.defect_pict || ""}
                                onChangeValue={(value) =>
                                  handleChangeCarDefectsEksterior({
                                    index,
                                    value,
                                    type: "defect_pict",
                                  })
                                }
                                filePath="img_path"
                              />
                              <Input
                                placeholder="Judul Defect Eskterior"
                                value={interior?.defect_title}
                                onChange={(e) =>
                                  handleChangeCarDefectsEksterior({
                                    index,
                                    value: e.target.value,
                                    type: "defect_title",
                                  })
                                }
                              ></Input>
                            </Stack>

                            <IconButton
                              aria-label="Icon Delete File"
                              position="absolute"
                              top={-2}
                              right={-1}
                              onClick={() =>
                                handleRemoveCarDefectsEksterior(index)
                              }
                              icon={<Icon icon="bx:x" fontSize="24px" />}
                              size="sm"
                              bgColor="bma.primary"
                              color="white"
                              _hover={{}}
                            ></IconButton>
                          </Box>
                        ))}
                      </SimpleGrid>
                    </>
                  ) : (
                    <>
                      <Center h="80px" bgColor="#e3e4e6" borderRadius="8px">
                        Belum ada foto defect Eksterior, klik tombol Tambah Foto
                        untuk mengupload foto
                      </Center>
                    </>
                  )}
                </Stack>

                <Stack direction="column" spacing="20px">
                  <Stack
                    direction="row"
                    alignItems="start"
                    justifyContent="space-between"
                  >
                    <Text fontWeight="700" fontSize="18px">
                      Others
                    </Text>
                    <Button
                      variant="primary-solid-small"
                      leftIcon={<Icon icon="bx:plus" />}
                      onClick={handleAddCarDefectsOther}
                    >
                      Tambah Foto
                    </Button>
                  </Stack>

                  {carDefectsOthers && carDefectsOthers?.length > 0 ? (
                    <>
                      <SimpleGrid columns={[1, 1, 2, 6]} gap="10px">
                        {carDefectsOthers?.map((interior, index) => (
                          <Box position="relative">
                            <Stack direction="column" spacing="10px">
                              <UploadFile
                                url={interior?.defect_pict || ""}
                                onChangeValue={(value) =>
                                  handleChangeCarDefectsOther({
                                    index,
                                    value,
                                    type: "defect_pict",
                                  })
                                }
                                filePath="img_path"
                              />
                              <Input
                                placeholder="Judul Defect Others"
                                value={interior?.defect_title}
                                onChange={(e) =>
                                  handleChangeCarDefectsOther({
                                    index,
                                    value: e.target.value,
                                    type: "defect_title",
                                  })
                                }
                              ></Input>
                            </Stack>

                            <IconButton
                              aria-label="Icon Delete File"
                              position="absolute"
                              top={-2}
                              right={-1}
                              onClick={() => handleRemoveCarDefectsOther(index)}
                              icon={<Icon icon="bx:x" fontSize="24px" />}
                              size="sm"
                              bgColor="bma.primary"
                              color="white"
                              _hover={{}}
                            ></IconButton>
                          </Box>
                        ))}
                      </SimpleGrid>
                    </>
                  ) : (
                    <>
                      <Center h="80px" bgColor="#e3e4e6" borderRadius="8px">
                        Belum ada foto defect Others, klik tombol Tambah Foto
                        untuk mengupload foto
                      </Center>
                    </>
                  )}
                </Stack>
              </Stack>
            </Box>

            <Box p="10px" borderRadius="8px" border="1px solid #DBDBDB">
              <Stack direction="column" spacing="20px">
                <Text fontWeight="700" fontSize="18px">
                  Video Mobil
                </Text>

                <Stack direction="column" spacing="5px">
                  <Text fontSize="14px" color="grey">
                    Video Kerusakan
                  </Text>
                  <Field name="video_file">
                    {({ field }: FieldAttributes<any>) => (
                      <Input
                        type="text"
                        placeholder="Link Video Kerusakan"
                        {...field}
                      />
                    )}
                  </Field>
                </Stack>
              </Stack>
            </Box>

            {type === "update" && (
              <Box p="10px" borderRadius="8px" border="1px solid #DBDBDB">
                <Stack direction="column" spacing="20px">
                  <Text fontWeight="700" fontSize="18px">
                    Status Mobil
                  </Text>

                  <Stack direction="column" spacing="5px">
                    <Text fontSize="14px" color="grey">
                      Status Mobil
                    </Text>
                    <Select
                      placeholder="Pilih Status"
                      required={type === "update"}
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="On Proses">On Proses</option>
                      <option value="Terjual">Terjual</option>
                      <option value="Lelang Ulang">Lelang Ulang</option>
                    </Select>
                  </Stack>
                </Stack>
              </Box>
            )}

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
