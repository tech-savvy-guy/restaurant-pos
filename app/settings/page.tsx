"use client"

import { useState, useEffect } from "react"
import { SidebarNav } from "@/components/sidebar-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/tabs"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    MenuIcon,
    Save,
    User,
    Building,
    CreditCard,
    Receipt,
    Percent,
    Bell,
    Users,
    FileText,
    Smartphone,
    Globe,
    ShieldCheck,
} from "lucide-react"

export default function SettingsPage() {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [activeTab, setActiveTab] = useState("account")

    // Check if screen is mobile
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768)
            if (window.innerWidth < 768) {
                setSidebarCollapsed(true)
            }
        }

        // Initial check
        checkScreenSize()

        // Add event listener for window resize
        window.addEventListener("resize", checkScreenSize)

        // Cleanup
        return () => window.removeEventListener("resize", checkScreenSize)
    }, [])

    return (
        <div className="flex h-screen bg-gray-100 overflow-hidden">
            <SidebarNav collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <div className="bg-white p-4 flex items-center gap-4 border-b">
                    {isMobile && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden hover:bg-transparent"
                            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                        >
                            <MenuIcon className="h-5 w-5" />
                        </Button>
                    )}
                    <div className="flex-1">
                        <h1 className="text-xl font-bold">Settings</h1>
                        <p className="text-sm text-gray-500 hidden sm:block">
                            Configure your restaurant and application preferences
                        </p>
                    </div>
                    <Button className="gap-2 whitespace-nowrap">
                        <Save className="h-4 w-4" />
                        <span className="hidden sm:inline">Save Changes</span>
                        <span className="sm:hidden">Save</span>
                    </Button>
                </div>

                {/* Main Content */}
                <div className="flex-1 overflow-hidden p-4 sm:p-6">
                    <Tabs defaultValue="account" value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
                        <div className="mb-6 w-full">

                            <ScrollArea className="w-full">
                                <TabsList className="h-10 p-1 bg-transparent border-0 shadow-none inline-flex mb-4">
                                    <TabsTrigger
                                        value="account"
                                        className="h-9 px-4 rounded-full text-center inline-flex items-center justify-center gap-1.5 whitespace-nowrap data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                                    >
                                        <User className="h-4 w-4" />
                                        <span>Account</span>
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="restaurant"
                                        className="h-9 px-4 rounded-full text-center inline-flex items-center justify-center gap-1.5 whitespace-nowrap data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                                    >
                                        <Building className="h-4 w-4" />
                                        <span>Restaurant</span>
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="payment"
                                        className="h-9 px-4 rounded-full text-center inline-flex items-center justify-center gap-1.5 whitespace-nowrap data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                                    >
                                        <CreditCard className="h-4 w-4" />
                                        <span>Payment</span>
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="tax"
                                        className="h-9 px-4 rounded-full text-center inline-flex items-center justify-center gap-1.5 whitespace-nowrap data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                                    >
                                        <Percent className="h-4 w-4" />
                                        <span>Tax</span>
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="receipt"
                                        className="h-9 px-4 rounded-full text-center inline-flex items-center justify-center gap-1.5 whitespace-nowrap data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                                    >
                                        <Receipt className="h-4 w-4" />
                                        <span>Receipt</span>
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="staff"
                                        className="h-9 px-4 rounded-full text-center inline-flex items-center justify-center gap-1.5 whitespace-nowrap data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                                    >
                                        <Users className="h-4 w-4" />
                                        <span>Staff</span>
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="notifications"
                                        className="h-9 px-4 rounded-full text-center inline-flex items-center justify-center gap-1.5 whitespace-nowrap data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                                    >
                                        <Bell className="h-4 w-4" />
                                        <span>Notifications</span>
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="system"
                                        className="h-9 px-4 rounded-full text-center inline-flex items-center justify-center gap-1.5 whitespace-nowrap data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                                    >
                                        <Smartphone className="h-4 w-4" />
                                        <span>System</span>
                                    </TabsTrigger>
                                </TabsList>
                                <ScrollBar orientation="horizontal" />
                            </ScrollArea>
                        </div>

                        <ScrollArea className="flex-1">
                            <TabsContent value="account" className="mt-0 h-full">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Account Settings</CardTitle>
                                        <CardDescription>Manage your account information and preferences</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-medium">Personal Information</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="name">Full Name</Label>
                                                    <Input id="name" defaultValue="John Doe" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="email">Email Address</Label>
                                                    <Input id="email" type="email" defaultValue="john@foodpark.com" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="phone">Phone Number</Label>
                                                    <Input id="phone" defaultValue="+1 (555) 123-4567" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="role">Role</Label>
                                                    <Select defaultValue="admin">
                                                        <SelectTrigger id="role">
                                                            <SelectValue placeholder="Select role" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="admin">Administrator</SelectItem>
                                                            <SelectItem value="manager">Manager</SelectItem>
                                                            <SelectItem value="staff">Staff</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                        </div>

                                        <Separator />

                                        <div className="space-y-4">
                                            <h3 className="text-lg font-medium">Security</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="current-password">Current Password</Label>
                                                    <Input id="current-password" type="password" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="new-password">New Password</Label>
                                                    <Input id="new-password" type="password" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                                                    <Input id="confirm-password" type="password" />
                                                </div>
                                            </div>

                                            <div className="space-y-2 pt-2">
                                                <div className="flex items-center justify-between">
                                                    <div className="space-y-0.5">
                                                        <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                                                        <p className="text-sm text-muted-foreground">
                                                            Add an extra layer of security to your account
                                                        </p>
                                                    </div>
                                                    <Switch id="two-factor" />
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button className="ml-auto">Save Account Settings</Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>

                            <TabsContent value="restaurant" className="mt-0 h-full">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Restaurant Profile</CardTitle>
                                        <CardDescription>Manage your restaurant information and business details</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-medium">Business Information</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="restaurant-name">Restaurant Name</Label>
                                                    <Input id="restaurant-name" defaultValue="Food Park Restaurant" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="business-type">Business Type</Label>
                                                    <Select defaultValue="restaurant">
                                                        <SelectTrigger id="business-type">
                                                            <SelectValue placeholder="Select type" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="restaurant">Restaurant</SelectItem>
                                                            <SelectItem value="cafe">Café</SelectItem>
                                                            <SelectItem value="fastfood">Fast Food</SelectItem>
                                                            <SelectItem value="bar">Bar & Grill</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="tax-id">Tax ID / Business Number</Label>
                                                    <Input id="tax-id" defaultValue="123-45-6789" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="business-phone">Business Phone</Label>
                                                    <Input id="business-phone" defaultValue="+1 (555) 987-6543" />
                                                </div>
                                            </div>
                                        </div>

                                        <Separator />

                                        <div className="space-y-4">
                                            <h3 className="text-lg font-medium">Location</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-2 md:col-span-2">
                                                    <Label htmlFor="address">Street Address</Label>
                                                    <Input id="address" defaultValue="123 Restaurant Street" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="city">City</Label>
                                                    <Input id="city" defaultValue="Foodville" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="state">State / Province</Label>
                                                    <Input id="state" defaultValue="California" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="zip">ZIP / Postal Code</Label>
                                                    <Input id="zip" defaultValue="90210" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="country">Country</Label>
                                                    <Select defaultValue="us">
                                                        <SelectTrigger id="country">
                                                            <SelectValue placeholder="Select country" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="us">United States</SelectItem>
                                                            <SelectItem value="ca">Canada</SelectItem>
                                                            <SelectItem value="uk">United Kingdom</SelectItem>
                                                            <SelectItem value="au">Australia</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button className="ml-auto">Save Restaurant Profile</Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>

                            <TabsContent value="payment" className="mt-0 h-full">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Payment Settings</CardTitle>
                                        <CardDescription>Configure payment methods and processing options</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-medium">Payment Processor</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="processor">Primary Payment Processor</Label>
                                                    <Select defaultValue="stripe">
                                                        <SelectTrigger id="processor">
                                                            <SelectValue placeholder="Select processor" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="stripe">Stripe</SelectItem>
                                                            <SelectItem value="square">Square</SelectItem>
                                                            <SelectItem value="paypal">PayPal</SelectItem>
                                                            <SelectItem value="authorize">Authorize.net</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="merchant-id">Merchant ID</Label>
                                                    <Input id="merchant-id" defaultValue="MERCH123456" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="api-key">API Key</Label>
                                                    <Input id="api-key" type="password" defaultValue="••••••••••••••••" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="webhook">Webhook URL</Label>
                                                    <Input id="webhook" defaultValue="https://foodpark.com/api/payments/webhook" />
                                                </div>
                                            </div>
                                        </div>

                                        <Separator />

                                        <div className="space-y-4">
                                            <h3 className="text-lg font-medium">Tipping Options</h3>
                                            <div className="space-y-2">
                                                <Label htmlFor="tip-presets">Default Tip Percentages</Label>
                                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                                    <Input id="tip-preset-1" defaultValue="15" className="w-full" />
                                                    <Input id="tip-preset-2" defaultValue="18" className="w-full" />
                                                    <Input id="tip-preset-3" defaultValue="20" className="w-full" />
                                                    <Input id="tip-preset-4" defaultValue="25" className="w-full" />
                                                </div>
                                                <p className="text-sm text-muted-foreground">Enter percentages for preset tip buttons</p>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Switch id="custom-tip" defaultChecked />
                                                <Label htmlFor="custom-tip">Allow custom tip amount</Label>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button className="ml-auto">Save Payment Settings</Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>

                            <TabsContent value="tax" className="mt-0 h-full">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Tax Settings</CardTitle>
                                        <CardDescription>Configure tax rates and tax calculation methods</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-medium">Default Tax Rates</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="sales-tax">Sales Tax Rate (%)</Label>
                                                    <Input id="sales-tax" type="number" step="0.01" defaultValue="8.25" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="tax-name">Tax Name</Label>
                                                    <Input id="tax-name" defaultValue="Sales Tax" />
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Switch id="tax-included" />
                                                <Label htmlFor="tax-included">Prices include tax</Label>
                                            </div>
                                        </div>

                                        <Separator />

                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-lg font-medium">Additional Tax Rates</h3>
                                                <Button variant="outline" size="sm">
                                                    Add Tax Rate
                                                </Button>
                                            </div>

                                            <div className="rounded-md border">
                                                <div className="hidden md:grid md:grid-cols-4 bg-muted/50 p-3 text-sm font-medium">
                                                    <div>Tax Name</div>
                                                    <div>Rate (%)</div>
                                                    <div>Applies To</div>
                                                    <div className="text-right">Actions</div>
                                                </div>
                                                <div className="divide-y">
                                                    {/* Mobile view */}
                                                    <div className="md:hidden p-3 space-y-3">
                                                        <div className="bg-gray-50 p-3 rounded-lg">
                                                            <div className="font-medium">Alcohol Tax</div>
                                                            <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                                                                <div className="text-gray-500">Rate:</div>
                                                                <div>10.00%</div>
                                                                <div className="text-gray-500">Applies To:</div>
                                                                <div>Alcoholic Beverages</div>
                                                            </div>
                                                            <div className="flex justify-end gap-2 mt-3">
                                                                <Button variant="ghost" size="sm">
                                                                    Edit
                                                                </Button>
                                                                <Button variant="ghost" size="sm" className="text-red-500">
                                                                    Delete
                                                                </Button>
                                                            </div>
                                                        </div>
                                                        <div className="bg-gray-50 p-3 rounded-lg">
                                                            <div className="font-medium">Takeout Tax</div>
                                                            <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                                                                <div className="text-gray-500">Rate:</div>
                                                                <div>5.00%</div>
                                                                <div className="text-gray-500">Applies To:</div>
                                                                <div>Takeout Orders</div>
                                                            </div>
                                                            <div className="flex justify-end gap-2 mt-3">
                                                                <Button variant="ghost" size="sm">
                                                                    Edit
                                                                </Button>
                                                                <Button variant="ghost" size="sm" className="text-red-500">
                                                                    Delete
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Desktop view */}
                                                    <div className="hidden md:grid md:grid-cols-4 p-3 text-sm">
                                                        <div>Alcohol Tax</div>
                                                        <div>10.00%</div>
                                                        <div>Alcoholic Beverages</div>
                                                        <div className="flex justify-end gap-2">
                                                            <Button variant="ghost" size="sm">
                                                                Edit
                                                            </Button>
                                                            <Button variant="ghost" size="sm" className="text-red-500">
                                                                Delete
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    <div className="hidden md:grid md:grid-cols-4 p-3 text-sm">
                                                        <div>Takeout Tax</div>
                                                        <div>5.00%</div>
                                                        <div>Takeout Orders</div>
                                                        <div className="flex justify-end gap-2">
                                                            <Button variant="ghost" size="sm">
                                                                Edit
                                                            </Button>
                                                            <Button variant="ghost" size="sm" className="text-red-500">
                                                                Delete
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <Separator />

                                        <div className="space-y-4">
                                            <h3 className="text-lg font-medium">Tax Exemptions</h3>
                                            <div className="space-y-2">
                                                <div className="flex items-center space-x-2">
                                                    <Switch id="enable-exemptions" defaultChecked />
                                                    <Label htmlFor="enable-exemptions">Enable tax exemptions</Label>
                                                </div>
                                                <p className="text-sm text-muted-foreground">
                                                    Allow tax-exempt customers with valid certificates
                                                </p>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="exemption-validation">Exemption Validation Method</Label>
                                                <Select defaultValue="manual">
                                                    <SelectTrigger id="exemption-validation">
                                                        <SelectValue placeholder="Select method" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="manual">Manual Verification</SelectItem>
                                                        <SelectItem value="certificate">Certificate Number</SelectItem>
                                                        <SelectItem value="id">Tax ID Lookup</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button className="ml-auto">Save Tax Settings</Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>

                            <TabsContent value="receipt" className="mt-0 h-full">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Receipt Settings</CardTitle>
                                        <CardDescription>Customize receipts and digital invoices</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-medium">Receipt Information</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-2 md:col-span-2">
                                                    <Label htmlFor="receipt-header">Receipt Header</Label>
                                                    <Input id="receipt-header" defaultValue="Food Park Restaurant" />
                                                </div>
                                                <div className="space-y-2 md:col-span-2">
                                                    <Label htmlFor="receipt-footer">Receipt Footer</Label>
                                                    <Textarea
                                                        id="receipt-footer"
                                                        defaultValue="Thank you for dining with us! Please visit again soon."
                                                        className="min-h-[80px]"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="receipt-logo">Logo on Receipt</Label>
                                                    <div className="flex items-center gap-2">
                                                        <Input id="receipt-logo" type="file" className="w-full" />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="receipt-font">Receipt Font</Label>
                                                    <Select defaultValue="sans">
                                                        <SelectTrigger id="receipt-font">
                                                            <SelectValue placeholder="Select font" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="sans">Sans-serif</SelectItem>
                                                            <SelectItem value="serif">Serif</SelectItem>
                                                            <SelectItem value="mono">Monospace</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                        </div>

                                    </CardContent>
                                    <CardFooter>
                                        <Button className="ml-auto">Save Receipt Settings</Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>

                            <TabsContent value="staff" className="mt-0 h-full">
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between">
                                        <div>
                                            <CardTitle>Staff Management</CardTitle>
                                            <CardDescription>Manage staff accounts and permissions</CardDescription>
                                        </div>
                                        <Button>Add Staff Member</Button>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="rounded-md border">
                                            <div className="hidden md:grid md:grid-cols-5 bg-muted/50 p-3 text-sm font-medium">
                                                <div>Name</div>
                                                <div>Role</div>
                                                <div>Email</div>
                                                <div>Status</div>
                                                <div className="text-right">Actions</div>
                                            </div>
                                            <div className="divide-y">
                                                {/* Mobile view */}
                                                <div className="block md:hidden">
                                                    {[
                                                        {
                                                            name: "John Doe",
                                                            role: "Administrator",
                                                            email: "john@foodpark.com",
                                                            status: "Active",
                                                            statusColor: "text-green-600",
                                                        },
                                                        {
                                                            name: "Jane Smith",
                                                            role: "Manager",
                                                            email: "jane@foodpark.com",
                                                            status: "Active",
                                                            statusColor: "text-green-600",
                                                        },
                                                        {
                                                            name: "Mike Johnson",
                                                            role: "Server",
                                                            email: "mike@foodpark.com",
                                                            status: "Active",
                                                            statusColor: "text-green-600",
                                                        },
                                                        {
                                                            name: "Sarah Williams",
                                                            role: "Cashier",
                                                            email: "sarah@foodpark.com",
                                                            status: "On Leave",
                                                            statusColor: "text-yellow-600",
                                                        },
                                                        {
                                                            name: "Robert Brown",
                                                            role: "Kitchen Staff",
                                                            email: "robert@foodpark.com",
                                                            status: "Inactive",
                                                            statusColor: "text-gray-500",
                                                        },
                                                    ].map((staff, index) => (
                                                        <div key={index} className="p-3 space-y-2">
                                                            <div className="flex justify-between">
                                                                <div className="font-medium">{staff.name}</div>
                                                                <div className={staff.statusColor}>{staff.status}</div>
                                                            </div>
                                                            <div className="text-sm text-gray-500">{staff.role}</div>
                                                            <div className="text-sm">{staff.email}</div>
                                                            <div className="flex justify-end gap-2 mt-2">
                                                                <Button variant="ghost" size="sm">
                                                                    Edit
                                                                </Button>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    className={staff.status === "Inactive" ? "text-green-500" : "text-red-500"}
                                                                >
                                                                    {staff.status === "Inactive" ? "Activate" : "Deactivate"}
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Desktop view */}
                                                <div className="hidden md:grid md:grid-cols-5 p-3 text-sm">
                                                    <div>John Doe</div>
                                                    <div>Administrator</div>
                                                    <div>john@foodpark.com</div>
                                                    <div className="text-green-600">Active</div>
                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="ghost" size="sm">
                                                            Edit
                                                        </Button>
                                                        <Button variant="ghost" size="sm" className="text-red-500">
                                                            Deactivate
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div className="hidden md:grid md:grid-cols-5 p-3 text-sm">
                                                    <div>Jane Smith</div>
                                                    <div>Manager</div>
                                                    <div>jane@foodpark.com</div>
                                                    <div className="text-green-600">Active</div>
                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="ghost" size="sm">
                                                            Edit
                                                        </Button>
                                                        <Button variant="ghost" size="sm" className="text-red-500">
                                                            Deactivate
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div className="hidden md:grid md:grid-cols-5 p-3 text-sm">
                                                    <div>Mike Johnson</div>
                                                    <div>Server</div>
                                                    <div>mike@foodpark.com</div>
                                                    <div className="text-green-600">Active</div>
                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="ghost" size="sm">
                                                            Edit
                                                        </Button>
                                                        <Button variant="ghost" size="sm" className="text-red-500">
                                                            Deactivate
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div className="hidden md:grid md:grid-cols-5 p-3 text-sm">
                                                    <div>Sarah Williams</div>
                                                    <div>Cashier</div>
                                                    <div>sarah@foodpark.com</div>
                                                    <div className="text-yellow-600">On Leave</div>
                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="ghost" size="sm">
                                                            Edit
                                                        </Button>
                                                        <Button variant="ghost" size="sm" className="text-red-500">
                                                            Deactivate
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div className="hidden md:grid md:grid-cols-5 p-3 text-sm">
                                                    <div>Robert Brown</div>
                                                    <div>Kitchen Staff</div>
                                                    <div>robert@foodpark.com</div>
                                                    <div className="text-gray-500">Inactive</div>
                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="ghost" size="sm">
                                                            Edit
                                                        </Button>
                                                        <Button variant="ghost" size="sm" className="text-green-500">
                                                            Activate
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <Separator />

                                        <div className="space-y-4">
                                            <h3 className="text-lg font-medium">Role Permissions</h3>
                                            <div className="space-y-4">
                                                <div className="rounded-md border p-4">
                                                    <h4 className="font-medium mb-2">Administrator</h4>
                                                    <p className="text-sm text-muted-foreground mb-3">
                                                        Full access to all system features and settings
                                                    </p>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                        <div className="flex items-center gap-2">
                                                            <ShieldCheck className="h-4 w-4 text-green-500" />
                                                            <span className="text-sm">Manage Staff</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <ShieldCheck className="h-4 w-4 text-green-500" />
                                                            <span className="text-sm">Manage Menu</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <ShieldCheck className="h-4 w-4 text-green-500" />
                                                            <span className="text-sm">View Reports</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <ShieldCheck className="h-4 w-4 text-green-500" />
                                                            <span className="text-sm">Manage Settings</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="rounded-md border p-4">
                                                    <h4 className="font-medium mb-2">Manager</h4>
                                                    <p className="text-sm text-muted-foreground mb-3">
                                                        Access to most features except critical settings
                                                    </p>
                                                    <Button variant="outline" size="sm" className="mb-3">
                                                        Edit Permissions
                                                    </Button>
                                                </div>

                                                <div className="rounded-md border p-4">
                                                    <h4 className="font-medium mb-2">Server</h4>
                                                    <p className="text-sm text-muted-foreground mb-3">
                                                        Access to order management and customer service
                                                    </p>
                                                    <Button variant="outline" size="sm" className="mb-3">
                                                        Edit Permissions
                                                    </Button>
                                                </div>

                                                <div className="rounded-md border p-4">
                                                    <h4 className="font-medium mb-2">Cashier</h4>
                                                    <p className="text-sm text-muted-foreground mb-3">
                                                        Access to payment processing and basic orders
                                                    </p>
                                                    <Button variant="outline" size="sm" className="mb-3">
                                                        Edit Permissions
                                                    </Button>
                                                </div>

                                                <div className="rounded-md border p-4">
                                                    <h4 className="font-medium mb-2">Kitchen Staff</h4>
                                                    <p className="text-sm text-muted-foreground mb-3">Access to kitchen display system only</p>
                                                    <Button variant="outline" size="sm" className="mb-3">
                                                        Edit Permissions
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="notifications" className="mt-0 h-full">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Notification Settings</CardTitle>
                                        <CardDescription>Configure alerts and notification preferences</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-medium">Email Notifications</h3>
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <Label htmlFor="daily-summary" className="font-medium">
                                                            Daily Summary
                                                        </Label>
                                                        <p className="text-sm text-muted-foreground">Receive daily sales and activity summary</p>
                                                    </div>
                                                    <Switch id="daily-summary" defaultChecked />
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <Label htmlFor="large-orders" className="font-medium">
                                                            Large Orders
                                                        </Label>
                                                        <p className="text-sm text-muted-foreground">Get notified for orders above $100</p>
                                                    </div>
                                                    <Switch id="large-orders" defaultChecked />
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <Label htmlFor="inventory-alerts" className="font-medium">
                                                            Inventory Alerts
                                                        </Label>
                                                        <p className="text-sm text-muted-foreground">Notifications when items are running low</p>
                                                    </div>
                                                    <Switch id="inventory-alerts" defaultChecked />
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <Label htmlFor="staff-changes" className="font-medium">
                                                            Staff Changes
                                                        </Label>
                                                        <p className="text-sm text-muted-foreground">Alerts about staff schedule changes</p>
                                                    </div>
                                                    <Switch id="staff-changes" />
                                                </div>
                                            </div>
                                        </div>

                                        <Separator />

                                        <div className="space-y-4">
                                            <h3 className="text-lg font-medium">System Alerts</h3>
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <Label htmlFor="kitchen-delays" className="font-medium">
                                                            Kitchen Delays
                                                        </Label>
                                                        <p className="text-sm text-muted-foreground">Alert when orders are taking too long</p>
                                                    </div>
                                                    <Switch id="kitchen-delays" defaultChecked />
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <Label htmlFor="payment-issues" className="font-medium">
                                                            Payment Issues
                                                        </Label>
                                                        <p className="text-sm text-muted-foreground">Notification for failed payments</p>
                                                    </div>
                                                    <Switch id="payment-issues" defaultChecked />
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <Label htmlFor="new-reviews" className="font-medium">
                                                            New Reviews
                                                        </Label>
                                                        <p className="text-sm text-muted-foreground">Alert when customers leave reviews</p>
                                                    </div>
                                                    <Switch id="new-reviews" defaultChecked />
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <Label htmlFor="system-updates" className="font-medium">
                                                            System Updates
                                                        </Label>
                                                        <p className="text-sm text-muted-foreground">Notifications about software updates</p>
                                                    </div>
                                                    <Switch id="system-updates" defaultChecked />
                                                </div>
                                            </div>
                                        </div>

                                        <Separator />

                                        <div className="space-y-4">
                                            <h3 className="text-lg font-medium">Notification Recipients</h3>
                                            <div className="space-y-3">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="primary-email">Primary Email</Label>
                                                        <Input id="primary-email" defaultValue="manager@foodpark.com" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="secondary-email">Secondary Email</Label>
                                                        <Input id="secondary-email" defaultValue="owner@foodpark.com" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="phone-number">SMS Notification Number</Label>
                                                        <Input id="phone-number" defaultValue="+1 (555) 123-4567" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="notification-time">Daily Summary Time</Label>
                                                        <Input id="notification-time" type="time" defaultValue="22:00" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button className="ml-auto">Save Notification Settings</Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>

                            <TabsContent value="system" className="mt-0 h-full">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>System Settings</CardTitle>
                                        <CardDescription>Configure system preferences and device settings</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-medium">Display Settings</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="theme">Theme</Label>
                                                    <Select defaultValue="light">
                                                        <SelectTrigger id="theme">
                                                            <SelectValue placeholder="Select theme" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="light">Light</SelectItem>
                                                            <SelectItem value="dark">Dark</SelectItem>
                                                            <SelectItem value="system">System Default</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="language">Language</Label>
                                                    <Select defaultValue="en">
                                                        <SelectTrigger id="language">
                                                            <SelectValue placeholder="Select language" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="en">English</SelectItem>
                                                            <SelectItem value="es">Spanish</SelectItem>
                                                            <SelectItem value="fr">French</SelectItem>
                                                            <SelectItem value="de">German</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="font-size">Font Size</Label>
                                                    <Select defaultValue="medium">
                                                        <SelectTrigger id="font-size">
                                                            <SelectValue placeholder="Select size" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="small">Small</SelectItem>
                                                            <SelectItem value="medium">Medium</SelectItem>
                                                            <SelectItem value="large">Large</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="date-format">Date Format</Label>
                                                    <Select defaultValue="mdy">
                                                        <SelectTrigger id="date-format">
                                                            <SelectValue placeholder="Select format" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                                                            <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                                                            <SelectItem value="ymd">YYYY-MM-DD</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                        </div>

                                        <Separator />

                                        <div className="space-y-4">
                                            <h3 className="text-lg font-medium">Hardware Settings</h3>
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <Label htmlFor="printer-enabled" className="font-medium">
                                                            Receipt Printer
                                                        </Label>
                                                        <p className="text-sm text-muted-foreground">Enable automatic printing</p>
                                                    </div>
                                                    <Switch id="printer-enabled" defaultChecked />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="printer-type">Printer Type</Label>
                                                    <Select defaultValue="thermal">
                                                        <SelectTrigger id="printer-type">
                                                            <SelectValue placeholder="Select printer" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="thermal">Thermal Printer</SelectItem>
                                                            <SelectItem value="impact">Impact Printer</SelectItem>
                                                            <SelectItem value="inkjet">Inkjet Printer</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="printer-ip">Printer IP Address</Label>
                                                    <Input id="printer-ip" defaultValue="192.168.1.100" />
                                                </div>
                                                <div className="flex items-center justify-between mt-4">
                                                    <div>
                                                        <Label htmlFor="cash-drawer" className="font-medium">
                                                            Cash Drawer
                                                        </Label>
                                                        <p className="text-sm text-muted-foreground">Automatically open cash drawer</p>
                                                    </div>
                                                    <Switch id="cash-drawer" defaultChecked />
                                                </div>
                                                <div className="flex items-center justify-between mt-4">
                                                    <div>
                                                        <Label htmlFor="barcode-scanner" className="font-medium">
                                                            Barcode Scanner
                                                        </Label>
                                                        <p className="text-sm text-muted-foreground">Enable barcode scanning</p>
                                                    </div>
                                                    <Switch id="barcode-scanner" defaultChecked />
                                                </div>
                                            </div>
                                        </div>

                                        <Separator />

                                        <div className="space-y-4">
                                            <h3 className="text-lg font-medium">System Maintenance</h3>
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <Label htmlFor="auto-updates" className="font-medium">
                                                            Automatic Updates
                                                        </Label>
                                                        <p className="text-sm text-muted-foreground">Install updates automatically</p>
                                                    </div>
                                                    <Switch id="auto-updates" defaultChecked />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="update-time">Update Time</Label>
                                                    <Select defaultValue="night">
                                                        <SelectTrigger id="update-time">
                                                            <SelectValue placeholder="Select time" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="night">Overnight (2 AM)</SelectItem>
                                                            <SelectItem value="closing">After Closing</SelectItem>
                                                            <SelectItem value="manual">Manual Only</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="flex items-center justify-between mt-4">
                                                    <div>
                                                        <Label htmlFor="data-backup" className="font-medium">
                                                            Automatic Backups
                                                        </Label>
                                                        <p className="text-sm text-muted-foreground">Daily data backup to cloud</p>
                                                    </div>
                                                    <Switch id="data-backup" defaultChecked />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="backup-frequency">Backup Frequency</Label>
                                                    <Select defaultValue="daily">
                                                        <SelectTrigger id="backup-frequency">
                                                            <SelectValue placeholder="Select frequency" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="daily">Daily</SelectItem>
                                                            <SelectItem value="weekly">Weekly</SelectItem>
                                                            <SelectItem value="monthly">Monthly</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="pt-2 flex gap-2">
                                                    <Button variant="outline">Run Manual Backup</Button>
                                                    <Button variant="outline">System Diagnostics</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button className="ml-auto">Save System Settings</Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>
                        </ScrollArea>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

