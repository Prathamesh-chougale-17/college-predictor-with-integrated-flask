import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function LoginForm() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Predict College</CardTitle>
        <CardDescription>
          Enter your Percentile and Category to predict your college
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Percentile</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-2">
          <RadioGroup defaultValue="comfortable">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1" id="r1" />
              <Label htmlFor="r1">General</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="2" id="r2" />
              <Label htmlFor="r2">OBC</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="3" id="r3" />
              <Label htmlFor="r3">ST / SC</Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Sign in</Button>
      </CardFooter>
    </Card>
  );
}
