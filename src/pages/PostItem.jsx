import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/Label';
import { Textarea } from '../components/ui/Textarea';
import { Select } from '../components/ui/Select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { useToast } from '../components/Toast';
import { CATEGORIES, CONDITIONS, LOCATIONS } from '../data/items';

export function PostItem() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    title: '',
    category: '',
    description: '',
    condition: '',
    location: '',
  });

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Title is required';
    if (!form.category) e.category = 'Category is required';
    if (!form.description.trim()) e.description = 'Description is required';
    if (!form.condition) e.condition = 'Condition is required';
    if (!form.location) e.location = 'Location is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      addToast('Posted successfully!');
      navigate('/dashboard/listings');
    }, 800);
  };

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Post an item</h1>
        <p className="text-muted-foreground mt-1">Share something with your community</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Item details</CardTitle>
          <CardDescription>Fill in the details of the item you want to share.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="e.g. Organic Rice & Lentils Pack"
                value={form.title}
                onChange={(e) => update('title', e.target.value)}
                className={errors.title ? 'border-destructive' : ''}
              />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title}</p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  id="category"
                  value={form.category}
                  onChange={(e) => update('category', e.target.value)}
                  className={errors.category ? 'border-destructive' : ''}
                >
                  <option value="">Select category</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </Select>
                {errors.category && (
                  <p className="text-sm text-destructive">{errors.category}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="condition">Condition</Label>
                <Select
                  id="condition"
                  value={form.condition}
                  onChange={(e) => update('condition', e.target.value)}
                  className={errors.condition ? 'border-destructive' : ''}
                >
                  <option value="">Select condition</option>
                  {CONDITIONS.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </Select>
                {errors.condition && (
                  <p className="text-sm text-destructive">{errors.condition}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the item and any relevant details..."
                value={form.description}
                onChange={(e) => update('description', e.target.value)}
                rows={4}
                className={errors.description ? 'border-destructive' : ''}
              />
              {errors.description && (
                <p className="text-sm text-destructive">{errors.description}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Image (optional)</Label>
              <div className="border-2 border-dashed border-border rounded-2xl p-12 text-center hover:border-primary/30 hover:bg-muted/30 transition-smooth cursor-pointer">
                <input type="file" accept="image/*" className="hidden" id="image-upload" />
                <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center gap-2">
                  <div className="h-14 w-14 rounded-2xl bg-muted flex items-center justify-center">
                    <Upload className="h-7 w-7 text-muted-foreground" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">
                    Click to upload or drag and drop
                  </span>
                  <span className="text-xs text-muted-foreground">PNG, JPG up to 5MB</span>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Select
                id="location"
                value={form.location}
                onChange={(e) => update('location', e.target.value)}
                className={errors.location ? 'border-destructive' : ''}
              >
                <option value="">Select area</option>
                {LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </Select>
              {errors.location && (
                <p className="text-sm text-destructive">{errors.location}</p>
              )}
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={submitting} className="flex-1">
                {submitting ? 'Posting...' : 'Post item'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/dashboard')}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
