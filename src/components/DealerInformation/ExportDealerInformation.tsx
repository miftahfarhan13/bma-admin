import useDownloadCSV from "@/utils/hooks/useDownloadCSV";
import {
  Box,
  Button,
  FocusLock,
  Input,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Select,
  SimpleGrid,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";

export default function ExportDealerInformation() {
  const { isLoading, downloadCSV } = useDownloadCSV();

  const { onOpen, onClose, isOpen } = useDisclosure();

  const [startDateState, setStartDateState] = useState("");
  const [endDateState, setEndDateState] = useState("");
  const [selectedItem, setSelectedItem] = useState("");

  const handleSave = async () => {
    let item: any = {};
    if (selectedItem) {
      item = JSON.parse(selectedItem);
    }

    await downloadCSV({
      url: item?.url,
      fileName: item?.fileName,
    });
  };

  const firstFieldRef = React.useRef(null);

  const exportOptions = [
    {
      url: `/api/login-history/analytics/export?start_date=${startDateState}&end_date=${endDateState}`,
      fileName: "No. Days of Login.csv",
      name: "No Days of Login",
    },
    {
      url: `/api/cars/view/analytics/export?start_date=${startDateState}&end_date=${endDateState}`,
      fileName: "No. Car Viewed.csv",
      name: "No Car Viewed",
    },
    {
      url: `/api/cars/bids/analytics/export?start_date=${startDateState}&end_date=${endDateState}`,
      fileName: "No. Car Bided.csv",
      name: "No. Car Bided",
    },
    {
      url: `/api/cars/winner/analytics/export?start_date=${startDateState}&end_date=${endDateState}`,
      fileName: "No. Car Won.csv",
      name: "No. Car Won",
    },
    {
      url: `/api/cars/sales-odo/analytics/export?start_date=${startDateState}&end_date=${endDateState}`,
      fileName: "Sales ODO.csv",
      name: "Sales ODO",
    },
    {
      url: `/api/cars/gvm-odo/analytics/export?start_date=${startDateState}&end_date=${endDateState}`,
      fileName: "GVM ODO.csv",
      name: "GVM ODO",
    },
  ];
  return (
    <>
      <Popover
        isOpen={isOpen}
        initialFocusRef={firstFieldRef}
        onOpen={onOpen}
        onClose={onClose}
        placement="bottom"
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <Stack
            direction="row"
            alignItems="center"
            spacing="10px"
            cursor="pointer"
            borderRadius="8px"
            border="1px solid #DBDBDB"
            py="8px"
            px="10px"
            whiteSpace="nowrap"
          >
            <Text fontSize="16px" fontWeight="bold">
              Export Data
            </Text>
            <Box minW="20px">
              <Icon icon="bx:download" fontSize="20px" />
            </Box>
          </Stack>
        </PopoverTrigger>
        <PopoverContent p={5} minW="400px">
          <FocusLock persistentFocus={false}>
            <PopoverArrow />
            <PopoverCloseButton />
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
            >
              <Stack direction="column" spacing="10px">
                <SimpleGrid columns={2} gap="10px">
                  <Stack direction="column" spacing="5px">
                    <Text fontSize="14px">Tanggal Awal</Text>
                    <Input
                      value={startDateState}
                      onChange={(event) => {
                        setStartDateState(event?.target?.value);
                      }}
                      type="date"
                      required
                    />
                  </Stack>
                  <Stack direction="column" spacing="5px">
                    <Text fontSize="14px">Tanggal Akhir</Text>
                    <Input
                      value={endDateState}
                      onChange={(event) => {
                        setEndDateState(event?.target?.value);
                      }}
                      type="date"
                      required
                    />
                  </Stack>
                </SimpleGrid>

                <Stack direction="column" spacing="5px">
                  <Text fontSize="14px" color="grey">
                    Pilihan Export
                  </Text>
                  <Select
                    placeholder="Pilih Export"
                    value={selectedItem}
                    onChange={(e) => setSelectedItem(e.target.value)}
                    required
                  >
                    {exportOptions.map((item) => (
                      <option value={JSON.stringify(item)}>{item?.name}</option>
                    ))}
                  </Select>
                </Stack>

                <Button variant="primary-solid-small" type="submit">
                  Export
                </Button>
              </Stack>
            </form>
          </FocusLock>
        </PopoverContent>
      </Popover>
    </>
  );
}
