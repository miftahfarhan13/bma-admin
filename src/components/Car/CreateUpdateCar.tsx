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
import { useRouter } from "next/router";
import UploadFile from "../AppComponents/UploadFile";
import useGetBrands from "@/utils/hooks/brand/useGetBrands";
import { Icon } from "@iconify/react/dist/iconify.js";
import { fetchCreateCar, fetchUpdateCar } from "@/networks/car";
import { fetchDeleteFile } from "@/networks/file";

interface ICarDefect {
  id: number | undefined;
  defect_title: string;
  defect_pict: string;
  defect_type: string;
  _delete: boolean;
}

interface IImagePath {
  id: number | undefined;
  img_path: string;
  _delete: boolean;
}

export default function CreateUpdateCar({
  car,
  id,
  type,
}: {
  car?: any;
  id?: string;
  type: string;
}) {
  const router = useRouter();
  const toast = useToast();

  const { data: brands } = useGetBrands();

  const [imgPaths, setImgPaths] = useState<Array<IImagePath>>([]);
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
    setStatus(car?.status || "");
    setInspectionDetail(car?.inspection_detail || "");
    setBpkbPict(car?.car_document?.bpkb_pict);
    setStnkPict(car?.car_document?.stnk_pict);
    setInvoicePict(car?.car_document?.invoice_pict);
    setVinPict(car?.car_document?.vin_pict);
    setFormAPict(car?.car_document?.form_a_pict);
    setStnkFotocopyPict(car?.car_document?.stnk_fotocopy_pict);
    setManualBookPict(car?.car_document?.manual_book_pict);
    setServiceBookPict(car?.car_document?.service_book_pict);
    setBackupKeyPict(car?.car_document?.backup_key_pict);
    setReceiptFormPict(car?.car_document?.receipt_form_pict);
    setDeclarationRightPict(car?.car_document?.declaration_right_pict);
    setToolkitPict(car?.car_document?.toolkit_pict);

    const imgPaths = car?.car_images?.map((carImg: any) => ({
      id: carImg?.id,
      img_path: carImg?.img_path,
      _delete: false,
    }));
    setImgPaths(imgPaths || []);

    const defectsInterior = car?.car_defects_interior?.map((defect: any) => ({
      id: defect?.id,
      defect_title: defect?.defect_title,
      defect_pict: defect?.defect_pict,
      defect_type: defect?.defect_type,
      _delete: false,
    }));
    setCarDefectsInterior(defectsInterior || []);

    const defectsEksterior = car?.car_defects_eksterior?.map((defect: any) => ({
      id: defect?.id,
      defect_title: defect?.defect_title,
      defect_pict: defect?.defect_pict,
      defect_type: defect?.defect_type,
      _delete: false,
    }));
    setCarDefectsEksterior(defectsEksterior || []);

    const defectsOther = car?.car_defects_others?.map((defect: any) => ({
      id: defect?.id,
      defect_title: defect?.defect_title,
      defect_pict: defect?.defect_pict,
      defect_type: defect?.defect_type,
      _delete: false,
    }));
    setCarDefectsOthers(defectsOther || []);
  }, [car]);

  const [isLoading, setIsLoading] = useState(false);

  const getInputValue = (values: any) => {
    const carDefects: any = [];
    const concatCarDefects = carDefects?.concat(
      carDefectsInterior,
      carDefectsEksterior,
      carDefectsOthers
    );

    let body: any = {
      brand_id: values?.brand_id,
      car_name: values?.car_name,
      car_availability: values?.car_availability,
      price: values?.price,
      current_price: values?.current_price,
      license_plate: values?.license_plate,
      odometer: values?.odometer,
      manufacture_year: values?.manufacture_year,
      car_tax: values?.car_tax,
      fuel_type: values?.fuel_type,
      transmission_type: values?.transmission_type,
      defect_status: values?.defect_status,
      is_flooded: values?.is_flooded === "1" ? true : false,
      auction_date: values?.auction_date,
      auction_session_run: values?.auction_session_run,
      car_documents: {
        bpkb_status: values?.bpkb_status === "1" ? true : false,
        stnk_status: values?.stnk_status === "1" ? true : false,
        invoice_status: values?.invoice_status === "1" ? true : false,
        vin_status: values?.vin_status === "1" ? true : false,
        form_a_status: values?.form_a_status === "1" ? true : false,
        stnk_fotocopy_status:
          values?.stnk_fotocopy_status === "1" ? true : false,
        manual_book_status: values?.manual_book_status === "1" ? true : false,
        service_book_status: values?.service_book_status === "1" ? true : false,
        backup_key_status: values?.backup_key_status === "1" ? true : false,
        receipt_form_status: values?.receipt_form_status === "1" ? true : false,
        declaration_right_status:
          values?.declaration_right_status === "1" ? true : false,
        toolkit_status: values?.toolkit_status === "1" ? true : false,
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
      },
      car_videos: [{ video_file: values?.video_file }],
      car_images: imgPaths,
      car_defects: concatCarDefects,
      inspection_detail: inspectionDetail,
    };

    if (type === "update") {
      body.status = status;
    }

    return body;
  };

  const createCar = async ({
    values,
    token,
  }: {
    values: any;
    token: string;
  }) => {
    const body = getInputValue(values);
    await fetchCreateCar(body, token)
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
    const body = getInputValue(values);
    await fetchUpdateCar(id, body, token)
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

  const onDeleteFile = async (fileName: string) => {
    const form = new FormData();
    form.append(
      "fileUrl",
      `${process.env.NEXT_PUBLIC_API_URL}/storage/${fileName}`
    );

    await fetchDeleteFile(localStorage.getItem("token") || "", form)
      .then((response) => {
        setIsLoading(false);
        toast({
          title: "Success",
          description: "Berhasil menghapus File!",
          status: "success",
          isClosable: true,
          position: "top",
        });
      })
      .catch((error) => {
        setIsLoading(false);
        const message = error?.response?.data?.message
          ? error?.response?.data?.message
          : error?.message;
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
    setImgPaths([...imgPaths, { id: undefined, img_path: "", _delete: false }]);
  };

  const handleChangeImgPaths = (index: number, value: string) => {
    const temp = [...imgPaths];
    temp[index].img_path = value;
    setImgPaths(temp);
  };

  const handleRemoveImgPaths = (index: any) => {
    const values = [...imgPaths];
    if (!values[index].id) values.splice(index, 1);
    else values[index]._delete = true;
    setImgPaths(values);
  };

  const handleAddCarDefectsInterior = () => {
    setCarDefectsInterior([
      ...carDefectsInterior,
      {
        id: undefined,
        defect_title: "",
        defect_pict: "",
        defect_type: "Interior",
        _delete: false,
      },
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
    if (!values[index].id) values.splice(index, 1);
    else values[index]._delete = true;
    setCarDefectsInterior(values);
  };

  const handleAddCarDefectsEksterior = () => {
    setCarDefectsEksterior([
      ...carDefectsEksterior,
      {
        id: undefined,
        defect_title: "",
        defect_pict: "",
        defect_type: "Eksterior",
        _delete: false,
      },
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
    if (!values[index].id) values.splice(index, 1);
    else values[index]._delete = true;
    setCarDefectsEksterior(values);
  };

  const handleAddCarDefectsOther = () => {
    setCarDefectsOthers([
      ...carDefectsOthers,
      {
        id: undefined,
        defect_title: "",
        defect_pict: "",
        defect_type: "Others",
        _delete: false,
      },
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
    if (!values[index].id) values.splice(index, 1);
    else values[index]._delete = true;
    setCarDefectsOthers(values);
  };
  return (
    <>
      <Formik
        initialValues={{
          brand_id: car?.brand_id || "",
          car_name: car?.car_name || "",
          car_availability: car?.car_availability || "",
          price: car?.price || "",
          current_price: car?.current_price || "",
          license_plate: car?.license_plate || "",
          odometer: car?.odometer || "",
          manufacture_year: car?.manufacture_year || "",
          car_tax: car?.car_tax || "",
          fuel_type: car?.fuel_type || "",
          transmission_type: car?.transmission_type || "",
          defect_status: car?.defect_status || "",
          is_flooded: !car?.is_flooded || car?.is_flooded === 0 ? "0" : "1",
          auction_date: car?.auction_date || "",
          auction_session_run: "10:00 - 15:00",
          bpkb_status:
            !car?.car_document?.bpkb_status ||
            car?.car_document?.bpkb_status === 0
              ? "0"
              : "1",
          stnk_status:
            !car?.car_document?.stnk_status ||
            car?.car_document?.stnk_status === 0
              ? "0"
              : "1",
          invoice_status:
            !car?.car_document?.invoice_status ||
            car?.car_document?.invoice_status === 0
              ? "0"
              : "1",
          vin_status:
            !car?.car_document?.vin_status ||
            car?.car_document?.vin_status === 0
              ? "0"
              : "1",
          form_a_status:
            !car?.car_document?.form_a_status ||
            car?.car_document?.form_a_status === 0
              ? "0"
              : "1",
          stnk_fotocopy_status:
            !car?.car_document?.stnk_fotocopy_status ||
            car?.car_document?.stnk_fotocopy_status === 0
              ? "0"
              : "1",
          manual_book_status:
            !car?.car_document?.manual_book_status ||
            car?.car_document?.manual_book_status === 0
              ? "0"
              : "1",
          service_book_status:
            !car?.car_document?.service_book_status ||
            car?.car_document?.service_book_status === 0
              ? "0"
              : "1",
          backup_key_status:
            !car?.car_document?.backup_key_status ||
            car?.car_document?.backup_key_status === 0
              ? "0"
              : "1",
          receipt_form_status:
            !car?.car_document?.receipt_form_status ||
            car?.car_document?.receipt_form_status === 0
              ? "0"
              : "1",
          declaration_right_status:
            !car?.car_document?.declaration_right_status ||
            car?.car_document?.declaration_right_status === 0
              ? "0"
              : "1",
          toolkit_status:
            !car?.car_document?.toolkit_status ||
            car?.car_document?.toolkit_status === 0
              ? "0"
              : "1",
          video_file: car?.car_videos ? car?.car_videos[0]?.video_file : "",
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
                    <SimpleGrid columns={[1, 1, 2, 4, 6]} gap="10px">
                      {imgPaths
                        ?.filter((fil) => !fil?._delete)
                        ?.map((imgPath, index) => (
                          <Box position="relative">
                            <UploadFile
                              url={imgPath?.img_path || ""}
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

                <SimpleGrid columns={[1, 1, 2, 4, 6]} gap="10px">
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
                      <SimpleGrid columns={[1, 1, 2, 4, 6]} gap="10px">
                        {carDefectsInterior
                          ?.filter((fil) => !fil?._delete)
                          ?.map((interior, index) => (
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
                      <SimpleGrid columns={[1, 1, 2, 4, 6]} gap="10px">
                        {carDefectsEksterior
                          ?.filter((fil) => !fil?._delete)
                          ?.map((interior, index) => (
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
                      <SimpleGrid columns={[1, 1, 2, 4, 6]} gap="10px">
                        {carDefectsOthers
                          ?.filter((fil) => !fil?._delete)
                          ?.map((interior, index) => (
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
                                onClick={() =>
                                  handleRemoveCarDefectsOther(index)
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
