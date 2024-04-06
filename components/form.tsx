"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Toaster, toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
const CollegePrediction = z.object({
  percentile: z
    .number({ invalid_type_error: "Percentile should be between 0 and 100" })
    .min(0, { message: "Percentile should be between 0 and 100" })
    .max(100, { message: "Percentile should be between 0 and 100" }),
  category: z.enum(["1", "2", "3"]),
});
interface resultProp {
  branch: string;
  category: string;
  college: string;
  percentile: string;
}
type CollegePredictionprop = z.infer<typeof CollegePrediction>;
export function PredictCollege() {
  const form = useForm<CollegePredictionprop>();
  const [results, setResults] = useState<resultProp[]>([]);
  const processForm: SubmitHandler<CollegePredictionprop> = async (data) => {
    // data.testResult = url!;
    const catnum = parseInt(data.category);
    const cat = ["General", "OBC", "ST/SC"];

    const sendData = {
      percentile: data.percentile,
      category: catnum,
    };
    console.log(sendData);
    const response = await fetch("http://127.0.0.1:5000/api/add", {
      method: "POST",
      body: JSON.stringify(sendData),
      headers: {
        "Content-Type": "application/json",
        mode: "no-cors",
      },
    });
    const { result, success } = await response.json();
    setResults((prev) => [
      ...prev,
      {
        branch: result.branch_prediction,
        category: cat[catnum],
        college: result.college_prediction,
        percentile: data.percentile.toString(),
      },
    ]);

    console.log(result);
    // console.log(recieveddata);
    if (success) {
      form.reset();
      toast("Data Recieved!");
      return;
    }
    toast("Something went wrong!");
    return;
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(processForm)}>
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Predict College</CardTitle>
              <CardDescription>
                Enter your Percentile and Category to predict your college
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="percentile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Percentile</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your Percentile" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="0" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              General
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="1" />
                            </FormControl>
                            <FormLabel className="font-normal">OBC</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="2" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              ST / SC
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" disabled={form.formState.isSubmitting}>
                Submit
              </Button>
            </CardFooter>
          </Card>
          <Toaster position="bottom-right" />
        </form>
      </Form>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Percentile</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>College</TableHead>
            <TableHead>Branch</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.map((result, index) => (
            <TableRow key={index}>
              <TableCell>{result.percentile}</TableCell>
              <TableCell>{result.category}</TableCell>
              <TableCell className="font-medium">{result.college}</TableCell>
              <TableCell className="font-medium">{result.branch}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
