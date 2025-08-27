'use client'

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { config } from "@/lib/config";

const GSA_RATES = {
  'Fresno, CA': { lodging: 104, meals: 59 },
  'Los Angeles, CA': { lodging: 180, meals: 74 },
  'Sacramento, CA': { lodging: 147, meals: 64 },
  'San Francisco, CA': { lodging: 304, meals: 74 },
  'Standard Rate': { lodging: 98, meals: 59 }
};

export default function InvoiceGeneratorApp() {
  const [invoice, setInvoice] = useState({
    invoiceNumber: '',
    clientName: '',
    clientAddress: '',
    serviceDescription: '',
    location: 'Standard Rate',
    days: 1,
    hourlyRate: 0,
    hours: 0,
    expenses: 0
  });

  const selectedRate = GSA_RATES[invoice.location as keyof typeof GSA_RATES];
  const perDiemTotal = (selectedRate.lodging + selectedRate.meals) * invoice.days;
  const laborTotal = invoice.hourlyRate * invoice.hours;
  const subtotal = perDiemTotal + laborTotal + invoice.expenses;
  const total = subtotal; // Add tax calculation if needed

  const handleInputChange = (field: string, value: string | number) => {
    setInvoice(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateInvoice = () => {
    const invoiceData = {
      ...invoice,
      perDiemTotal,
      laborTotal,
      subtotal,
      total,
      generatedDate: new Date().toLocaleDateString()
    };
    
    console.log('Generated Invoice:', invoiceData);
    // Here you would typically send to API or generate PDF
    alert('Invoice generated! Check console for details.');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Invoice Generator
          </h1>
          <p className="text-slate-600">
            Generate professional invoices with GSA per diem rates for California
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card>
            <CardHeader>
              <CardTitle>Invoice Details</CardTitle>
              <CardDescription>
                Enter the details for your invoice
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="invoiceNumber">Invoice Number</Label>
                <Input
                  id="invoiceNumber"
                  value={invoice.invoiceNumber}
                  onChange={(e) => handleInputChange('invoiceNumber', e.target.value)}
                  placeholder="INV-001"
                />
              </div>

              <div>
                <Label htmlFor="clientName">Client Name</Label>
                <Input
                  id="clientName"
                  value={invoice.clientName}
                  onChange={(e) => handleInputChange('clientName', e.target.value)}
                  placeholder="Company Name"
                />
              </div>

              <div>
                <Label htmlFor="clientAddress">Client Address</Label>
                <Input
                  id="clientAddress"
                  value={invoice.clientAddress}
                  onChange={(e) => handleInputChange('clientAddress', e.target.value)}
                  placeholder="123 Main St, City, State 12345"
                />
              </div>

              <div>
                <Label htmlFor="serviceDescription">Service Description</Label>
                <Input
                  id="serviceDescription"
                  value={invoice.serviceDescription}
                  onChange={(e) => handleInputChange('serviceDescription', e.target.value)}
                  placeholder="Consulting Services"
                />
              </div>

              <div>
                <Label htmlFor="location">Location (for Per Diem)</Label>
                <select
                  id="location"
                  value={invoice.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  {Object.keys(GSA_RATES).map(location => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="days">Days</Label>
                  <Input
                    id="days"
                    type="number"
                    value={invoice.days}
                    onChange={(e) => handleInputChange('days', parseInt(e.target.value) || 0)}
                    min="1"
                  />
                </div>
                <div>
                  <Label htmlFor="hours">Hours Worked</Label>
                  <Input
                    id="hours"
                    type="number"
                    value={invoice.hours}
                    onChange={(e) => handleInputChange('hours', parseFloat(e.target.value) || 0)}
                    min="0"
                    step="0.5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                  <Input
                    id="hourlyRate"
                    type="number"
                    value={invoice.hourlyRate}
                    onChange={(e) => handleInputChange('hourlyRate', parseFloat(e.target.value) || 0)}
                    min="0"
                    step="0.01"
                  />
                </div>
                <div>
                  <Label htmlFor="expenses">Other Expenses ($)</Label>
                  <Input
                    id="expenses"
                    type="number"
                    value={invoice.expenses}
                    onChange={(e) => handleInputChange('expenses', parseFloat(e.target.value) || 0)}
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Invoice Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Invoice Preview</CardTitle>
              <CardDescription>
                Live preview of your invoice
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border p-6 bg-white rounded-lg">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold">{config.company.name}</h2>
                  <p className="text-sm text-slate-600">{config.company.contact.email}</p>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold mb-2">INVOICE</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p><strong>Invoice #:</strong> {invoice.invoiceNumber || 'TBD'}</p>
                      <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p><strong>Bill To:</strong></p>
                      <p>{invoice.clientName || 'Client Name'}</p>
                      <p>{invoice.clientAddress || 'Client Address'}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Description</th>
                        <th className="text-right py-2">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2">
                          Per Diem - {invoice.location}<br/>
                          <span className="text-xs text-slate-500">
                            {invoice.days} days × ${selectedRate.lodging + selectedRate.meals}/day
                          </span>
                        </td>
                        <td className="text-right py-2">${perDiemTotal.toFixed(2)}</td>
                      </tr>
                      {invoice.hours > 0 && (
                        <tr className="border-b">
                          <td className="py-2">
                            {invoice.serviceDescription || 'Services'}<br/>
                            <span className="text-xs text-slate-500">
                              {invoice.hours} hours × ${invoice.hourlyRate}/hour
                            </span>
                          </td>
                          <td className="text-right py-2">${laborTotal.toFixed(2)}</td>
                        </tr>
                      )}
                      {invoice.expenses > 0 && (
                        <tr className="border-b">
                          <td className="py-2">Expenses</td>
                          <td className="text-right py-2">${invoice.expenses.toFixed(2)}</td>
                        </tr>
                      )}
                      <tr className="font-bold">
                        <td className="py-2">TOTAL</td>
                        <td className="text-right py-2">${total.toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <Button onClick={generateInvoice} className="w-full">
                  Generate Invoice
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}