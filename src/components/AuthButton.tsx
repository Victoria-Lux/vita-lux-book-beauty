
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/hooks/useAuth"
import { LogOut, User } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const AuthButton = () => {
  const { user, loading, signInWithProvider, signOut } = useAuth()
  const { toast } = useToast()

  const handleSignIn = async (provider: 'google' | 'facebook' | 'apple') => {
    try {
      await signInWithProvider(provider)
    } catch (error) {
      toast({
        title: "Sign In Error",
        description: "There was an error signing in. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
      })
    } catch (error) {
      toast({
        title: "Sign Out Error",
        description: "There was an error signing out. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return <Button variant="ghost" disabled>Loading...</Button>
  }

  if (user) {
    return (
      <div className="flex items-center space-x-3">
        <span className="text-sm text-salon-gray-600 hidden md:inline">
          <User className="w-4 h-4 inline mr-1" />
          {user.email}
        </span>
        <Button 
          variant="ghost" 
          onClick={handleSignOut}
          className="text-salon-gray-600 hover:text-salon-charcoal hover:bg-salon-gray-50"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-salon-charcoal">Sign In to Book</CardTitle>
        <CardDescription>
          Choose your preferred sign-in method to continue with your appointment booking
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button
          onClick={() => handleSignIn('google')}
          variant="outline"
          className="w-full border-salon-gray-200 hover:bg-salon-gray-50"
        >
          Continue with Google
        </Button>
        <Button
          onClick={() => handleSignIn('facebook')}
          variant="outline"
          className="w-full border-salon-gray-200 hover:bg-salon-gray-50"
        >
          Continue with Facebook
        </Button>
        <Button
          onClick={() => handleSignIn('apple')}
          variant="outline"
          className="w-full border-salon-gray-200 hover:bg-salon-gray-50"
        >
          Continue with Apple
        </Button>
      </CardContent>
    </Card>
  )
}

export default AuthButton
