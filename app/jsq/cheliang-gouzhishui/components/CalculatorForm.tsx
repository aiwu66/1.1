"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Calculator } from "lucide-react";
import { defaultTaxParams, additionalCostTypes } from '../constants';

const formSchema = z.object({
  basePrice: z.string().min(1, "请输入车辆价格"),
  includesVAT: z.boolean(),
  additionalCosts: z.string(),
  isNewEnergy: z.boolean(),
});

export type TaxParams = z.infer<typeof formSchema>;

interface CalculatorFormProps {
  initialParams: TaxParams;
  onCalculate: (values: TaxParams) => void;
}

export default function CalculatorForm({ 
  initialParams,
  onCalculate 
}: CalculatorFormProps) {
  const form = useForm<TaxParams>({
    resolver: zodResolver(formSchema),
    defaultValues: initialParams || defaultTaxParams,
  });

  return (
    <Card className="p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onCalculate)} className="space-y-6">
          <FormField
            control={form.control}
            name="basePrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>车辆价格（元）</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="请输入车辆价格" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="includesVAT"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">含增值税价格</FormLabel>
                  <FormDescription>
                    价格是否已包含13%增值税
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="additionalCosts"
            render={({ field }) => (
              <FormItem>
                <FormLabel>其他费用（元）</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="请输入其他费用" 
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  <div className="mt-2 space-y-1">
                    <p>常见费用参考：</p>
                    {additionalCostTypes.map((cost, index) => (
                      <p key={index} className="text-xs">
                        {cost.label}：约{cost.amount}元
                      </p>
                    ))}
                  </div>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isNewEnergy"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">新能源车型</FormLabel>
                  <FormDescription>
                    新能源汽车免征购置税
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            <Calculator className="mr-2 h-4 w-4" />
            计算购置税
          </Button>
        </form>
      </Form>
    </Card>
  );
}