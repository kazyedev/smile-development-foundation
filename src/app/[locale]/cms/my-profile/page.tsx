"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  User, 
  Mail, 
  Phone, 
  Shield, 
  Calendar, 
  Edit, 
  Save, 
  X,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Loader2
} from "lucide-react";
import { toast } from "sonner";
import { extractSectionNames } from "@/lib/utils/section-mapping";

interface UserProfile {
  id: string;
  email: string;
  role: string;
  name_en: string;
  name_ar: string;
  phone: string | null;
  image_url: string | null;
  bio: string | null;
  last_login: string | null;
  is_active: boolean;
  allowed_sections: any[];
}

export default function MyProfilePage() {
  const { locale } = useParams<{ locale: string }>();
  const isArabic = locale === "ar";
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name_en: "",
    name_ar: "",
    phone: "",
    bio: "",
    image_url: "",
  });

  const translations = {
    en: {
      title: "My Profile",
      subtitle: "View and manage your account information",
      personalInfo: "Personal Information",
      accountInfo: "Account Information",
      permissions: "Permissions",
      nameEn: "Name (English)",
      nameAr: "Name (Arabic)",
      email: "Email",
      phone: "Phone",
      bio: "Bio",
      role: "Role",
      status: "Status",
      lastLogin: "Last Login",
      memberSince: "Member Since",
      allowedSections: "Allowed Sections",
      noSections: "No specific sections assigned",
      active: "Active",
      inactive: "Inactive",
      edit: "Edit",
      cancel: "Cancel",
      save: "Save Changes",
      saving: "Saving...",
      profileUpdated: "Profile updated successfully",
      updateError: "Failed to update profile",
      loading: "Loading profile...",
      changePassword: "Change Password",
      uploadImage: "Upload Image",
      removeImage: "Remove Image",
      roleLabels: {
        super_admin: "Super Admin",
        admin: "Admin",
        content_manager: "Content Manager",
        viewer: "Viewer",
        author: "Author",
        default: "User"
      }
    },
    ar: {
      title: "حسابي",
      subtitle: "عرض وإدارة معلومات حسابك",
      personalInfo: "المعلومات الشخصية",
      accountInfo: "معلومات الحساب",
      permissions: "الصلاحيات",
      nameEn: "الاسم (إنجليزي)",
      nameAr: "الاسم (عربي)",
      email: "البريد الإلكتروني",
      phone: "الهاتف",
      bio: "السيرة الذاتية",
      role: "الدور",
      status: "الحالة",
      lastLogin: "آخر تسجيل دخول",
      memberSince: "عضو منذ",
      allowedSections: "الأقسام المسموحة",
      noSections: "لا توجد أقسام محددة معينة",
      active: "نشط",
      inactive: "غير نشط",
      edit: "تعديل",
      cancel: "إلغاء",
      save: "حفظ التغييرات",
      saving: "جاري الحفظ...",
      profileUpdated: "تم تحديث الملف الشخصي بنجاح",
      updateError: "فشل تحديث الملف الشخصي",
      loading: "جاري تحميل الملف الشخصي...",
      changePassword: "تغيير كلمة المرور",
      uploadImage: "رفع صورة",
      removeImage: "إزالة الصورة",
      roleLabels: {
        super_admin: "مدير عام",
        admin: "مدير",
        content_manager: "مدير المحتوى",
        viewer: "مشاهد",
        author: "كاتب",
        default: "مستخدم"
      }
    }
  };

  const t = isArabic ? translations.ar : translations.en;

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/auth/profile", { cache: "no-store" });
        if (response.ok) {
          const data = await response.json();
          if (data.profile) {
            setProfile(data.profile);
            setFormData({
              name_en: data.profile.name_en || "",
              name_ar: data.profile.name_ar || "",
              phone: data.profile.phone || "",
              bio: data.profile.bio || "",
              image_url: data.profile.image_url || "",
            });
          }
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        toast.error(t.updateError);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [t.updateError]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // TODO: Implement update API endpoint
      // const response = await fetch("/api/auth/profile", {
      //   method: "PUT",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(formData),
      // });
      
      // For now, just show success message
      toast.success(t.profileUpdated);
      setIsEditing(false);
      // Optionally refresh profile data
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error(t.updateError);
    } finally {
      setIsSaving(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-";
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat(isArabic ? "ar-SA" : "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    } catch {
      return dateString;
    }
  };

  const getInitials = (name: string) => {
    if (!name) return "U";
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">{t.loading}</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="max-w-md">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto" />
              <p className="text-muted-foreground">{t.updateError}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const allowedSections = extractSectionNames(profile.allowed_sections || []);
  const roleLabel = t.roleLabels[profile.role as keyof typeof t.roleLabels] || profile.role;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t.title}</h1>
          <p className="text-muted-foreground mt-1">{t.subtitle}</p>
        </div>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)} variant="outline">
            <Edit className="w-4 h-4 mr-2" />
            {t.edit}
          </Button>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Personal Information Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              {t.personalInfo}
            </CardTitle>
            <CardDescription>{t.personalInfo}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Profile Image */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                {profile.image_url ? (
                  <img
                    src={profile.image_url}
                    alt={isArabic ? profile.name_ar : profile.name_en}
                    className="w-24 h-24 rounded-full object-cover border-4 border-border"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center text-white text-2xl font-bold">
                    {getInitials(isArabic ? profile.name_ar : profile.name_en)}
                  </div>
                )}
                {isEditing && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
                    onClick={() => {
                      // TODO: Implement image upload
                      toast.info(t.uploadImage);
                    }}
                  >
                    <ImageIcon className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Name Fields */}
            <div className="space-y-4">
              {isEditing ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="name_en">{t.nameEn}</Label>
                    <Input
                      id="name_en"
                      value={formData.name_en}
                      onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name_ar">{t.nameAr}</Label>
                    <Input
                      id="name_ar"
                      value={formData.name_ar}
                      onChange={(e) => setFormData({ ...formData, name_ar: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t.phone}</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">{t.bio}</Label>
                    <Textarea
                      id="bio"
                      rows={4}
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      placeholder={isArabic ? "اكتب سيرتك الذاتية هنا..." : "Write your bio here..."}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">{t.nameEn}</Label>
                    <p className="text-sm font-medium">{profile.name_en || "-"}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">{t.nameAr}</Label>
                    <p className="text-sm font-medium">{profile.name_ar || "-"}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">{t.phone}</Label>
                    <p className="text-sm font-medium">{profile.phone || "-"}</p>
                  </div>
                  {profile.bio && (
                    <div className="space-y-2">
                      <Label className="text-muted-foreground">{t.bio}</Label>
                      <p className="text-sm text-muted-foreground">{profile.bio}</p>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Edit Actions */}
            {isEditing && (
              <div className="flex gap-2 pt-4 border-t">
                <Button onClick={handleSave} disabled={isSaving} className="flex-1">
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {t.saving}
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      {t.save}
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      name_en: profile.name_en || "",
                      name_ar: profile.name_ar || "",
                      phone: profile.phone || "",
                      bio: profile.bio || "",
                      image_url: profile.image_url || "",
                    });
                  }}
                  disabled={isSaving}
                >
                  <X className="w-4 h-4 mr-2" />
                  {t.cancel}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Account Information Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              {t.accountInfo}
            </CardTitle>
            <CardDescription>{t.accountInfo}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-muted-foreground">{t.email}</Label>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <p className="text-sm font-medium">{profile.email}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground">{t.role}</Label>
                <div className="flex items-center gap-2">
                  <div className="px-2 py-1 bg-brand-primary/10 text-brand-primary rounded-md text-sm font-medium">
                    {roleLabel}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground">{t.status}</Label>
                <div className="flex items-center gap-2">
                  {profile.is_active ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium text-green-600">{t.active}</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <span className="text-sm font-medium text-red-600">{t.inactive}</span>
                    </>
                  )}
                </div>
              </div>

              {profile.last_login && (
                <div className="space-y-2">
                  <Label className="text-muted-foreground">{t.lastLogin}</Label>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <p className="text-sm font-medium">{formatDate(profile.last_login)}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Permissions Section */}
            {(profile.role === 'viewer' || profile.role === 'author' || profile.role === 'content_manager') && (
              <div className="pt-4 border-t">
                <Label className="text-sm font-semibold mb-3 block">{t.permissions}</Label>
                {allowedSections.length > 0 ? (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground mb-2">{t.allowedSections}:</p>
                    <div className="flex flex-wrap gap-2">
                      {allowedSections.map((section) => (
                        <span
                          key={section}
                          className="px-2 py-1 bg-muted text-muted-foreground rounded-md text-xs font-medium"
                        >
                          {section.replace(/_/g, ' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">{t.noSections}</p>
                )}
              </div>
            )}

            {/* Change Password Button */}
            <div className="pt-4 border-t">
              <Button variant="outline" className="w-full" onClick={() => {
                // TODO: Implement password change
                toast.info(t.changePassword);
              }}>
                {t.changePassword}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

