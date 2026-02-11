/**
 * Admin Dashboard - Content Management
 * Manage landing page content, FAQ items, and contact submissions
 */

import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { Loader2, Plus, Edit2, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function AdminDashboard() {
  const { user, isAuthenticated } = useAuth();
  const [location, setLocation] = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation("/");
    } else if (user?.role !== "admin") {
      toast.error("Access denied: Admin privileges required");
      setLocation("/");
    }
  }, [isAuthenticated, user, setLocation]);

  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Content Management</h1>
          <p className="text-foreground/60 mt-2">
            Manage landing page content and submissions
          </p>
        </div>

        <Tabs defaultValue="faq" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="submissions">Submissions</TabsTrigger>
          </TabsList>

          <TabsContent value="faq" className="space-y-6">
            <FAQManager />
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <ServicesManager />
          </TabsContent>

          <TabsContent value="submissions" className="space-y-6">
            <ContactSubmissionsManager />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

// FAQ Manager Component
function FAQManager() {
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    category: "",
    question: "",
    answer: "",
  });

  const faqQuery = trpc.faq.getAll.useQuery();
  const createMutation = trpc.faq.create.useMutation();
  const updateMutation = trpc.faq.update.useMutation();
  const deleteMutation = trpc.faq.delete.useMutation();
  const utils = trpc.useUtils();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.category || !formData.question || !formData.answer) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      if (editingId) {
        await updateMutation.mutateAsync({
          id: editingId,
          ...formData,
        });
        toast.success("FAQ updated");
      } else {
        await createMutation.mutateAsync(formData);
        toast.success("FAQ created");
      }

      setFormData({ category: "", question: "", answer: "" });
      setEditingId(null);
      setIsCreating(false);
      await utils.faq.getAll.invalidate();
    } catch (error) {
      toast.error("Failed to save FAQ");
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Delete this FAQ?")) {
      try {
        await deleteMutation.mutateAsync({ id });
        toast.success("FAQ deleted");
        await utils.faq.getAll.invalidate();
      } catch (error) {
        toast.error("Failed to delete FAQ");
      }
    }
  };

  if (faqQuery.isLoading) {
    return <Loader2 className="w-8 h-8 animate-spin" />;
  }

  return (
    <div className="space-y-6">
      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? "Edit FAQ" : "Create FAQ"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Category</label>
                <Input
                  placeholder="e.g., Licensing"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium">Question</label>
                <Input
                  placeholder="FAQ question"
                  value={formData.question}
                  onChange={(e) =>
                    setFormData({ ...formData, question: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium">Answer</label>
                <Textarea
                  placeholder="FAQ answer"
                  rows={6}
                  value={formData.answer}
                  onChange={(e) =>
                    setFormData({ ...formData, answer: e.target.value })
                  }
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={createMutation.isPending}>
                  {createMutation.isPending ? "Saving..." : "Save"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsCreating(false);
                    setEditingId(null);
                    setFormData({ category: "", question: "", answer: "" });
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">FAQs</h3>
          {!isCreating && (
            <Button onClick={() => setIsCreating(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add FAQ
            </Button>
          )}
        </div>

        <div className="grid gap-4">
          {faqQuery.data?.map((faq) => (
            <Card key={faq.id}>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="text-xs text-foreground/60 mb-1">
                        {faq.category}
                      </p>
                      <p className="font-medium">{faq.question}</p>
                      <p className="text-sm text-foreground/70 mt-2">
                        {faq.answer}
                      </p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setFormData({
                            category: faq.category,
                            question: faq.question,
                            answer: faq.answer,
                          });
                          setEditingId(faq.id);
                          setIsCreating(true);
                        }}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(faq.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

// Services Manager Component
function ServicesManager() {
  const servicesQuery = trpc.services.getAll.useQuery();

  if (servicesQuery.isLoading) {
    return <Loader2 className="w-8 h-8 animate-spin" />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Services</CardTitle>
        <CardDescription>
          View service offerings (edit coming soon)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {servicesQuery.data?.map((service) => (
            <div key={service.id} className="p-4 border rounded-lg">
              <h4 className="font-medium">{service.name}</h4>
              <p className="text-sm text-foreground/70 mt-1">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Contact Submissions Manager Component
function ContactSubmissionsManager() {
  const submissionsQuery = trpc.contact.getAll.useQuery();
  const updateMutation = trpc.contact.updateStatus.useMutation();
  const utils = trpc.useUtils();

  const handleStatusUpdate = async (
    id: number,
    status: "new" | "contacted" | "resolved"
  ) => {
    try {
      await updateMutation.mutateAsync({ id, status });
      toast.success("Status updated");
      await utils.contact.getAll.invalidate();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  if (submissionsQuery.isLoading) {
    return <Loader2 className="w-8 h-8 animate-spin" />;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">
          Submissions ({submissionsQuery.data?.length || 0})
        </h3>
      </div>

      <div className="grid gap-4">
        {submissionsQuery.data?.map((submission) => (
          <Card key={submission.id}>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium">{submission.name}</h4>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          submission.status === "new"
                            ? "bg-blue-100 text-blue-700"
                            : submission.status === "contacted"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {submission.status}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/60">
                      {submission.email}
                    </p>
                    {submission.company && (
                      <p className="text-sm text-foreground/60">
                        {submission.company}
                      </p>
                    )}
                    <p className="text-sm mt-3 text-foreground/70">
                      {submission.message}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 pt-2 border-t">
                  <Button
                    size="sm"
                    variant={submission.status === "new" ? "default" : "outline"}
                    onClick={() => handleStatusUpdate(submission.id, "new")}
                  >
                    New
                  </Button>
                  <Button
                    size="sm"
                    variant={
                      submission.status === "contacted" ? "default" : "outline"
                    }
                    onClick={() =>
                      handleStatusUpdate(submission.id, "contacted")
                    }
                  >
                    Contacted
                  </Button>
                  <Button
                    size="sm"
                    variant={
                      submission.status === "resolved" ? "default" : "outline"
                    }
                    onClick={() =>
                      handleStatusUpdate(submission.id, "resolved")
                    }
                  >
                    Resolved
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
