import { Button, Input, SimpleGrid, Stack } from "@chakra-ui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useRef, useState } from "react";
import DashboardCounterData from "./DashboardCounterData";
import useGetDashboard from "@/utils/hooks/dashboard/useGetDashboard";
import { useReactToPrint } from "react-to-print";

export default function DashboardCounterHistorical() {
  const componentPdf = useRef();

  const [isExporting, setIsExporting] = useState(false);
  const [date, setDate] = useState("");

  const { data, refetch } = useGetDashboard({ dateProps: date });

  const generatePDF = useReactToPrint({
    // @ts-ignore
    content: () => componentPdf.current,
    documentTitle: "Dashboard Data",
  });

  const onExport = () => {
    setIsExporting(true);

    setTimeout(() => {
      generatePDF();
      setIsExporting(false);
    }, 500);
  };

  return (
    <>
      <style type="text/css" media="print">
        {
          "\
        @page { size: landscape; padding: 20px }\
      "
        }
      </style>
      <Stack direction="column" spacing="20px">
        <Stack
          direction="row"
          spacing="10px"
          alignSelf="end"
          w={["100%", "100%", "fit-content", "fit-content"]}
        >
          <Input
            value={date}
            onChange={(event) => {
              setDate(event?.target?.value);
              refetch(event?.target?.value);
            }}
            type="date"
          />
          <Button
            leftIcon={<Icon icon="bx:download" />}
            variant="green-solid-medium"
            width="100%"
            onClick={onExport}
            isLoading={isExporting}
          >
            Export Data
          </Button>
        </Stack>

        <SimpleGrid
          columns={isExporting ? 5 : [2, 2, 3, 5]}
          gap={["10px", "10px", "20px", "20px"]}
          p={isExporting ? "20px" : "0px"}
          // @ts-ignore
          ref={componentPdf}
        >
          <DashboardCounterData data={data} />
        </SimpleGrid>
      </Stack>
    </>
  );
}
