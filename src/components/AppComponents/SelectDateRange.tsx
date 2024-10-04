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
  SimpleGrid,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import moment from "moment";
import React, { useEffect, useState } from "react";

export default function SelectDateRange({
  dateRanges,
  onChangeDateRanges,
}: {
  dateRanges: Array<string>;
  onChangeDateRanges: (value: Array<string>) => void;
}) {
  const { onOpen, onClose, isOpen } = useDisclosure();

  const [startDateState, setStartDateState] = useState("");
  const [endDateState, setEndDateState] = useState("");

  const handleSave = () => {
    onChangeDateRanges([startDateState, endDateState]);
    onClose();
  };

  useEffect(() => {
    setStartDateState(dateRanges[0]);
    setEndDateState(dateRanges[1]);
  }, [dateRanges]);

  const firstFieldRef = React.useRef(null);
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
            py="5px"
            px="10px"
            whiteSpace="nowrap"
          >
            <Text fontSize="14px">
              {dateRanges[0] && dateRanges[1]
                ? `${moment(new Date(dateRanges[0])).format(
                    "YYYY/MM/DD"
                  )} - ${moment(new Date(dateRanges[1])).format("YYYY/MM/DD")}`
                : "Pilih Tanggal"}
            </Text>
            <Box minW="20px">
              <Icon icon="bx:calendar" fontSize="20px" />
            </Box>
          </Stack>
          {/* <Button
            variant="outline"
            w="300px"
            rightIcon={<Icon icon="bx:calendar" />}
          >
            {startDate && endDate
              ? `${startDate} - ${endDate}`
              : "Pilih Tanggal"}
          </Button> */}
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
                <SimpleGrid columns={2} gap="10px">
                  <Button
                    variant="outline"
                    h="34px"
                    onClick={() => {
                      onChangeDateRanges(["", ""]);
                      onClose();
                    }}
                  >
                    Reset
                  </Button>
                  <Button variant="primary-solid-small" type="submit">
                    Simpan
                  </Button>
                </SimpleGrid>
              </Stack>
            </form>
          </FocusLock>
        </PopoverContent>
      </Popover>
    </>
  );
}
