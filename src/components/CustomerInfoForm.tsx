
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { supabase, Customer } from "@/lib/supabase"
import { useAuth } from "@/hooks/useAuth"
import { Mail, Phone, User } from "lucide-react"

interface CustomerInfoFormProps {
  onCustomerCreated: (customer: Customer) => void
}

const CustomerInfoForm = ({ onCustomerCreated }: CustomerInfoFormProps) => {
  const { user } = useAuth()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    referral_source: ""
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    if (!user) return
    
    if (!formData.first_name || !formData.last_name) {
      toast({
        title: "Missing Information",
        description: "Please fill in your first and last name.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('customers')
        .upsert({
          auth_user_id: user.id,
          email: user.email!,
          first_name: formData.first_name,
          last_name: formData.last_name,
          phone: formData.phone || null,
          referral_source: formData.referral_source || null
        })
        .select()
        .single()

      if (error) throw error

      toast({
        title: "Profile Updated",
        description: "Your information has been saved successfully.",
      })

      onCustomerCreated(data)
    } catch (error) {
      console.error('Error saving customer info:', error)
      toast({
        title: "Error",
        description: "There was an error saving your information. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-salon-charcoal">Complete Your Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="first_name" className="text-salon-charcoal">
              <User className="w-4 h-4 inline mr-2" />
              First Name *
            </Label>
            <Input
              id="first_name"
              placeholder="First name"
              value={formData.first_name}
              onChange={(e) => handleInputChange("first_name", e.target.value)}
              className="border-salon-gray-200 focus:border-salon-coral"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last_name" className="text-salon-charcoal">
              Last Name *
            </Label>
            <Input
              id="last_name"
              placeholder="Last name"
              value={formData.last_name}
              onChange={(e) => handleInputChange("last_name", e.target.value)}
              className="border-salon-gray-200 focus:border-salon-coral"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-salon-charcoal">
            <Mail className="w-4 h-4 inline mr-2" />
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            value={user?.email || ""}
            disabled
            className="border-salon-gray-200 bg-salon-gray-50"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-salon-charcoal">
            <Phone className="w-4 h-4 inline mr-2" />
            Phone Number
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className="border-salon-gray-200 focus:border-salon-coral"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-salon-charcoal">How did you hear about us?</Label>
          <Select value={formData.referral_source} onValueChange={(value) => handleInputChange("referral_source", value)}>
            <SelectTrigger className="border-salon-gray-200 focus:border-salon-coral">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="google">Google Search</SelectItem>
              <SelectItem value="social_media">Social Media</SelectItem>
              <SelectItem value="friend_referral">Friend Referral</SelectItem>
              <SelectItem value="walk_by">Walked By</SelectItem>
              <SelectItem value="advertisement">Advertisement</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button 
          className="w-full bg-salon-coral hover:bg-salon-coral-dark text-white py-3"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Information"}
        </Button>
      </CardContent>
    </Card>
  )
}

export default CustomerInfoForm
