import { createColumnHelper } from "@tanstack/react-table";
import { styled, theme } from "@/styles/stitches.config";
import { useQueryGet } from "@/hooks/api/useQueryGet";
import { BaseTable } from "@/components/tables";
import type { Deal } from "@/types";
import { Skeleton } from "@/components/feedback";
import { Icon } from "@/components/media";
import { EditDealDialog } from "@/components/overlay";
import { edit } from "@/assets/icons";
import { useState } from "react";
import Link from "next/link";

export const DealsTable = () => {
  const { data, isLoading: dealsLoad } = useQueryGet<Deal[]>({
    url: "/deals",
    queryKeys: ["deals"],
    reqParams: {
      _sort: "title",
    },
    queryConfigs: { refetchOnWindowFocus: false },
  });
  const [rowDealId, setRowDealId] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleDealEdit = (rowDealId: string) => {
    setRowDealId(rowDealId);
    setIsOpen(true);
  };

  const columnHelper = createColumnHelper<Deal>();
  const columns = [
    columnHelper.accessor("title", {
      header: "Title",
      cell: ({ row, getValue }) => {
        const title = getValue();
        return title ? (
          <Link href={`deals/${row.getValue("id")}`} passHref>
            <LinkCell>{title}</LinkCell>
          </Link>
        ) : (
          <Skeleton />
        );
      },
    }),
    columnHelper.accessor("description", {
      header: "Description",
      cell: ({ row, getValue }) => {
        const description = getValue();
        return description ? (
          <Link href={`deals/${row.getValue("id")}`} passHref>
            <LinkCell>{description}</LinkCell>
          </Link>
        ) : (
          <Skeleton />
        );
      },
    }),
    columnHelper.accessor("price", {
      header: "Price",
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: ({ getValue }) => {
        const status = getValue();

        return status ? (
          <StatusTag
            status={status.label === "Closed" ? "closed" : "inProgress"}
          >
            {status?.label?.toUpperCase()}
          </StatusTag>
        ) : (
          <Skeleton />
        );
      },
    }),
    columnHelper.accessor("id", {
      header: "Edit",
      cell: ({ getValue }) => {
        const rowDealId = getValue();
        return (
          <ButtonCell
            onClick={() => handleDealEdit(rowDealId)}
            title="Edit Deal"
          >
            <Icon src={edit.src} />
          </ButtonCell>
        );
      },
    }),
  ];

  return (
    <>
      <EditDealDialog
        dealId={rowDealId}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <BaseTable
        total={data?.length}
        data={data}
        columns={columns}
        isLoading={dealsLoad}
      />
    </>
  );
};

const StatusTag = styled("span", {
  _alignCenter: true,

  width: "8rem",
  paddingY: "0.3rem",

  fontWeight: theme.fontWeights.bold,

  borderRadius: theme.radii.md,

  variants: {
    status: {
      inProgress: {
        color: theme.colors.text1,
        backgroundColor: theme.colors.primary,
      },
      closed: {
        color: theme.colors.text2,
        backgroundColor: theme.colors.background3,
      },
    },
  },
});

const ButtonCell = styled("button", {
  "border": "unset",
  "backgroundColor": "transparent",
  "width": "100%",
  "height": "3rem",
  "display": "flex",
  "alignItems": "center",

  "cursor": "pointer",
  "opacity": "0.3",

  "&:hover": {
    opacity: "1",
  },
  "&[disabled]": { opacity: "0.3" },
});
const LinkCell = styled("a", {
  all: "unset",

  width: "100%",
  height: "3rem",
  display: "flex",
  alignItems: "center",

  cursor: "pointer",
});
