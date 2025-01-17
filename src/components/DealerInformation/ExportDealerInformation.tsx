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
  Radio,
  RadioGroup,
  Select,
  SimpleGrid,
  Stack,
  Switch,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";

export default function ExportDealerInformation() {
  const { isLoading, downloadFile } = useDownloadCSV();

  const { onOpen, onClose, isOpen } = useDisclosure();

  const [startDateState, setStartDateState] = useState("");
  const [endDateState, setEndDateState] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [type, setType] = useState("yearly");

  const handleSave = async () => {
    let item: any = {};
    if (selectedItem) {
      item = JSON.parse(selectedItem);
    }

    let url = `${item?.url}?start_date=${startDateState}`;
    if (isRange) url += `&end_date=${endDateState}`;

    await downloadFile({
      url,
      fileName: item?.fileName,
      fileType: "excel",
    });
  };

  const firstFieldRef = React.useRef(null);

  const exportOptions = [
    {
      url: `/api/login-history/analytics/export`,
      fileName: "No. Days of Login",
      name: "No Days of Login",
    },
    {
      url: `/api/cars/view/analytics/export`,
      fileName: "No. Car Viewed",
      name: "No Car Viewed",
    },
    {
      url: `/api/cars/bids/analytics/export`,
      fileName: "No. Car Bided",
      name: "No. Car Bided",
    },
    {
      url: `/api/cars/winner/analytics/export`,
      fileName: "No. Car Won",
      name: "No. Car Won",
    },
    {
      url: `/api/cars/sales-odo/analytics/export`,
      fileName: "Sales ODO",
      name: "Sales ODO",
    },
    {
      url: `/api/cars/gvm-odo/analytics/export`,
      fileName: "GVM ODO",
      name: "GVM ODO",
    },
  ];

  const isRange = type == "yearly";
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
              <Stack direction="column" spacing="20px">
                <RadioGroup
                  onChange={(e) => {
                    setType(e);
                    setStartDateState("");
                    setEndDateState("");
                  }}
                  value={type}
                >
                  <Stack direction="row" gap="20px">
                    <Radio value="yearly" colorScheme="red">
                      Export Yearly
                    </Radio>
                    <Radio value="monthly" colorScheme="red">
                      Export Monthly
                    </Radio>
                  </Stack>
                </RadioGroup>

                <SimpleGrid columns={isRange ? 2 : 1} gap="10px">
                  <Stack direction="column" spacing="5px">
                    <Text fontSize="14px" color="grey">
                      Tanggal {isRange ? "Awal" : ""}
                    </Text>
                    <Input
                      value={startDateState}
                      onChange={(event) => {
                        setStartDateState(event?.target?.value);
                      }}
                      type="date"
                      required
                    />
                  </Stack>
                  {isRange ? (
                    <Stack direction="column" spacing="5px">
                      <Text fontSize="14px" color="grey">
                        Tanggal Akhir
                      </Text>
                      <Input
                        value={endDateState}
                        onChange={(event) => {
                          setEndDateState(event?.target?.value);
                        }}
                        type="date"
                        required={!isRange}
                      />
                    </Stack>
                  ) : null}
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

                <Button
                  variant="primary-solid-small"
                  type="submit"
                  isLoading={isLoading}
                >
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
