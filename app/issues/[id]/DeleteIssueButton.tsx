"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogTrigger,
  Button,
  Flex,
} from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function DeleteIssueButton({ issueId }: { issueId: number }) {
  const router = useRouter();
  return (
    <AlertDialog.Root>
      <AlertDialogTrigger>
        <Button color="red">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
        <AlertDialogDescription>
          Are you sure you want to delete this issue? This action cannont be
          undone!
        </AlertDialogDescription>
        <Flex mt="4" gap="3">
          <AlertDialogCancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction>
            <Button
              color="red"
              onClick={async () => {
                await axios.delete("/api/issues/" + issueId);
                router.push("/issues");
                router.refresh();
              }}
            >
              Delete Issue
            </Button>
          </AlertDialogAction>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
