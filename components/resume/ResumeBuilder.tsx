import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Plus, Trash2, Download, Eye } from "lucide-react";

interface WorkExperience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Education {
  institution: string;
  degree: string;
  field: string;
  graduationDate: string;
}

interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
  };
  workExperience: WorkExperience[];
  education: Education[];
  skills: string[];
}

export default function ResumeBuilder() {
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      summary: "",
    },
    workExperience: [],
    education: [],
    skills: [],
  });

  const [currentSkill, setCurrentSkill] = useState("");
  const [previewMode, setPreviewMode] = useState(false);

  const handlePersonalInfoChange = (field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  const addWorkExperience = () => {
    setResumeData(prev => ({
      ...prev,
      workExperience: [
        ...prev.workExperience,
        { company: "", position: "", startDate: "", endDate: "", description: "" }
      ]
    }));
  };

  const updateWorkExperience = (index: number, field: keyof WorkExperience, value: string) => {
    setResumeData(prev => ({
      ...prev,
      workExperience: prev.workExperience.map((exp, i) =>
        i === index ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeWorkExperience = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      workExperience: prev.workExperience.filter((_, i) => i !== index)
    }));
  };

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [
        ...prev.education,
        { institution: "", degree: "", field: "", graduationDate: "" }
      ]
    }));
  };

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) =>
        i === index ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const removeEducation = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const addSkill = () => {
    if (currentSkill.trim()) {
      setResumeData(prev => ({
        ...prev,
        skills: [...prev.skills, currentSkill.trim()]
      }));
      setCurrentSkill("");
    }
  };

  const removeSkill = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const handleExport = () => {
    // TODO: Implement PDF export functionality
    console.log("Exporting resume:", resumeData);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Resume Builder</h1>
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() => setPreviewMode(!previewMode)}
            className="gap-2"
          >
            <Eye className="h-4 w-4" />
            {previewMode ? "Edit" : "Preview"}
          </Button>
          <Button onClick={handleExport} className="gap-2">
            <Download className="h-4 w-4" />
            Export PDF
          </Button>
        </div>
      </div>

      {!previewMode ? (
        <div className="space-y-8">
          {/* Personal Information */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card p-6 rounded-lg shadow-sm"
          >
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Full Name"
                value={resumeData.personalInfo.fullName}
                onChange={(e) => handlePersonalInfoChange("fullName", e.target.value)}
              />
              <Input
                placeholder="Email"
                type="email"
                value={resumeData.personalInfo.email}
                onChange={(e) => handlePersonalInfoChange("email", e.target.value)}
              />
              <Input
                placeholder="Phone"
                value={resumeData.personalInfo.phone}
                onChange={(e) => handlePersonalInfoChange("phone", e.target.value)}
              />
              <Input
                placeholder="Location"
                value={resumeData.personalInfo.location}
                onChange={(e) => handlePersonalInfoChange("location", e.target.value)}
              />
            </div>
            <Textarea
              placeholder="Professional Summary"
              className="mt-4"
              value={resumeData.personalInfo.summary}
              onChange={(e) => handlePersonalInfoChange("summary", e.target.value)}
            />
          </motion.section>

          {/* Work Experience */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card p-6 rounded-lg shadow-sm"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Work Experience</h2>
              <Button onClick={addWorkExperience} variant="outline" size="sm" className="gap-2">
                <Plus className="h-4 w-4" /> Add Experience
              </Button>
            </div>
            {resumeData.workExperience.map((exp, index) => (
              <div key={index} className="mb-6 p-4 border border-border rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Company"
                    value={exp.company}
                    onChange={(e) => updateWorkExperience(index, "company", e.target.value)}
                  />
                  <Input
                    placeholder="Position"
                    value={exp.position}
                    onChange={(e) => updateWorkExperience(index, "position", e.target.value)}
                  />
                  <Input
                    placeholder="Start Date"
                    type="date"
                    value={exp.startDate}
                    onChange={(e) => updateWorkExperience(index, "startDate", e.target.value)}
                  />
                  <Input
                    placeholder="End Date"
                    type="date"
                    value={exp.endDate}
                    onChange={(e) => updateWorkExperience(index, "endDate", e.target.value)}
                  />
                </div>
                <Textarea
                  placeholder="Description"
                  className="mt-4"
                  value={exp.description}
                  onChange={(e) => updateWorkExperience(index, "description", e.target.value)}
                />
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeWorkExperience(index)}
                  className="mt-4 gap-2"
                >
                  <Trash2 className="h-4 w-4" /> Remove
                </Button>
              </div>
            ))}
          </motion.section>

          {/* Education */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card p-6 rounded-lg shadow-sm"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Education</h2>
              <Button onClick={addEducation} variant="outline" size="sm" className="gap-2">
                <Plus className="h-4 w-4" /> Add Education
              </Button>
            </div>
            {resumeData.education.map((edu, index) => (
              <div key={index} className="mb-6 p-4 border border-border rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Institution"
                    value={edu.institution}
                    onChange={(e) => updateEducation(index, "institution", e.target.value)}
                  />
                  <Input
                    placeholder="Degree"
                    value={edu.degree}
                    onChange={(e) => updateEducation(index, "degree", e.target.value)}
                  />
                  <Input
                    placeholder="Field of Study"
                    value={edu.field}
                    onChange={(e) => updateEducation(index, "field", e.target.value)}
                  />
                  <Input
                    placeholder="Graduation Date"
                    type="date"
                    value={edu.graduationDate}
                    onChange={(e) => updateEducation(index, "graduationDate", e.target.value)}
                  />
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeEducation(index)}
                  className="mt-4 gap-2"
                >
                  <Trash2 className="h-4 w-4" /> Remove
                </Button>
              </div>
            ))}
          </motion.section>

          {/* Skills */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card p-6 rounded-lg shadow-sm"
          >
            <h2 className="text-xl font-semibold mb-4">Skills</h2>
            <div className="flex gap-2 mb-4">
              <Input
                placeholder="Add a skill"
                value={currentSkill}
                onChange={(e) => setCurrentSkill(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addSkill()}
              />
              <Button onClick={addSkill} variant="outline" className="gap-2">
                <Plus className="h-4 w-4" /> Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-primary/10 text-primary px-3 py-1 rounded-full flex items-center gap-2"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(index)}
                    className="hover:text-destructive transition-colors"
                    aria-label={`Remove ${skill} skill`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </motion.section>
        </div>
      ) : (
        <div className="bg-card p-8 rounded-lg shadow-sm">
          {/* Preview Mode - TODO: Implement resume preview */}
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold mb-2">{resumeData.personalInfo.fullName}</h1>
            <div className="text-muted-foreground mb-6">
              <p>{resumeData.personalInfo.email} | {resumeData.personalInfo.phone}</p>
              <p>{resumeData.personalInfo.location}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">Professional Summary</h2>
              <p className="text-muted-foreground">{resumeData.personalInfo.summary}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Work Experience</h2>
              {resumeData.workExperience.map((exp, index) => (
                <div key={index} className="mb-6">
                  <h3 className="text-xl font-medium">{exp.position}</h3>
                  <p className="text-primary font-medium">{exp.company}</p>
                  <p className="text-sm text-muted-foreground mb-2">
                    {exp.startDate} - {exp.endDate}
                  </p>
                  <p className="text-muted-foreground">{exp.description}</p>
                </div>
              ))}
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Education</h2>
              {resumeData.education.map((edu, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-xl font-medium">{edu.degree} in {edu.field}</h3>
                  <p className="text-primary font-medium">{edu.institution}</p>
                  <p className="text-sm text-muted-foreground">Graduated: {edu.graduationDate}</p>
                </div>
              ))}
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-primary/10 text-primary px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}