import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Droplet, Heart, Shield, Zap } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-medical-red rounded-full p-6 shadow-lg">
              <Droplet className="h-16 w-16 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-primary mb-4">
            Blood Inventory Management
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Streamline your hospital's blood bank operations with our comprehensive inventory management system
          </p>
          <Button
            size="lg"
            className="text-lg px-8 py-6"
            onClick={() => navigate("/auth")}
          >
            Get Started
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-16">
          <div className="bg-card p-6 rounded-lg shadow-lg border border-border">
            <div className="bg-primary/10 rounded-full p-3 w-fit mb-4">
              <Heart className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Real-time Tracking</h3>
            <p className="text-muted-foreground">
              Monitor blood inventory levels in real-time across all blood types
            </p>
          </div>

          <div className="bg-card p-6 rounded-lg shadow-lg border border-border">
            <div className="bg-medical-red/10 rounded-full p-3 w-fit mb-4">
              <Shield className="h-8 w-8 text-medical-red" />
            </div>
            <h3 className="text-xl font-bold mb-2">Secure Management</h3>
            <p className="text-muted-foreground">
              Secure donor records and transfer tracking with role-based access
            </p>
          </div>

          <div className="bg-card p-6 rounded-lg shadow-lg border border-border">
            <div className="bg-success/10 rounded-full p-3 w-fit mb-4">
              <Zap className="h-8 w-8 text-success" />
            </div>
            <h3 className="text-xl font-bold mb-2">Quick Response</h3>
            <p className="text-muted-foreground">
              Handle urgent requests and transfers efficiently
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
