import { motion } from "framer-motion";

interface ResumePreviewProps {
  data: {
    personalInfo: {
      fullName: string;
      email: string;
      phone: string;
      location: string;
      summary: string;
    };
    experience: Array<{
      id: string;
      company: string;
      position: string;
      startDate: string;
      endDate: string;
      description: string;
    }>;
    education: Array<{
      id: string;
      institution: string;
      degree: string;
      field: string;
      graduationDate: string;
    }>;
    skills: Array<{
      id: string;
      name: string;
      level: string;
    }>;
  };
}

export default function ResumePreview({ data }: ResumePreviewProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-background border rounded-lg shadow-lg max-w-4xl mx-auto p-8 print:shadow-none print:border-none"
    >
      {/* Header */}
      <div className="text-center mb-8 border-b pb-6">
        <h1 className="text-3xl font-bold mb-2">{data.personalInfo.fullName}</h1>
        <div className="text-muted-foreground space-x-4">
          {data.personalInfo.email && (
            <span>{data.personalInfo.email}</span>
          )}
          {data.personalInfo.phone && (
            <span>{data.personalInfo.phone}</span>
          )}
          {data.personalInfo.location && (
            <span>{data.personalInfo.location}</span>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-primary">Professional Summary</h2>
          <p className="text-muted-foreground">{data.personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-primary">Work Experience</h2>
          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">{exp.position}</h3>
                    <div className="text-muted-foreground">{exp.company}</div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate) || "Present"}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground whitespace-pre-line">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-primary">Education</h2>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{edu.degree}</h3>
                  <div className="text-muted-foreground">{edu.institution}</div>
                  <div className="text-sm text-muted-foreground">{edu.field}</div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {formatDate(edu.graduationDate)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4 text-primary">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <div
                key={skill.id}
                className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
              >
                {skill.name} - {skill.level}
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}