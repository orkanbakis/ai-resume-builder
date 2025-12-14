import type { ResumeData, TemplateId } from '@/types/resume'

interface ResumePreviewProps {
  data: ResumeData
  aiBullets: Record<string, string[]>
  templateId: TemplateId
}

export function ResumePreview({ data, aiBullets, templateId }: ResumePreviewProps) {
  const { personalDetails, workExperience, education, skills } = data

  // Modern Template - Sans-serif with blue accent
  if (templateId === 'modern') {
    return (
      <div className="font-sans text-[10px] text-gray-900 bg-white">
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-xl font-bold text-gray-900 mb-1">
            {personalDetails.fullName || 'Your Name'}
          </h1>
          <p className="text-[9px] text-gray-500">
            {[personalDetails.email, personalDetails.phone, personalDetails.location]
              .filter(Boolean)
              .join(' | ')}
          </p>
          {personalDetails.linkedIn && (
            <p className="text-[9px] text-blue-600">{personalDetails.linkedIn}</p>
          )}
          <div className="h-0.5 bg-blue-600 mx-auto mt-2 w-24" />
        </div>

        {/* Summary */}
        {personalDetails.professionalSummary && (
          <div className="mb-3">
            <h2 className="text-[11px] font-bold uppercase tracking-wide border-b border-gray-200 pb-1 mb-2">
              Professional Summary
            </h2>
            <p className="text-[9px] text-gray-600 leading-relaxed">
              {personalDetails.professionalSummary}
            </p>
          </div>
        )}

        {/* Experience */}
        {workExperience.length > 0 && (
          <div className="mb-3">
            <h2 className="text-[11px] font-bold uppercase tracking-wide border-b border-gray-200 pb-1 mb-2">
              Experience
            </h2>
            {workExperience.slice(0, 2).map((exp) => (
              <div key={exp.id} className="mb-2">
                <div className="flex justify-between">
                  <span className="font-bold text-[10px]">{exp.title}</span>
                  <span className="text-[9px] text-gray-500">
                    {exp.startDate} - {exp.isCurrentRole ? 'Present' : exp.endDate}
                  </span>
                </div>
                <p className="text-[9px] text-gray-600">{exp.company}</p>
                {aiBullets[exp.id]?.length > 0 && (
                  <ul className="mt-1 space-y-0.5">
                    {aiBullets[exp.id].slice(0, 3).map((bullet, idx) => (
                      <li key={idx} className="text-[9px] text-gray-600 flex gap-1">
                        <span className="text-blue-600">•</span>
                        <span className="line-clamp-1">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="mb-3">
            <h2 className="text-[11px] font-bold uppercase tracking-wide border-b border-gray-200 pb-1 mb-2">
              Education
            </h2>
            {education.slice(0, 2).map((edu) => (
              <div key={edu.id} className="mb-1">
                <div className="flex justify-between">
                  <span className="font-bold text-[10px]">
                    {edu.degree} in {edu.fieldOfStudy}
                  </span>
                  <span className="text-[9px] text-gray-500">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
                <p className="text-[9px] text-gray-600">{edu.institution}</p>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h2 className="text-[11px] font-bold uppercase tracking-wide border-b border-gray-200 pb-1 mb-2">
              Skills
            </h2>
            <p className="text-[9px] text-gray-600">
              {skills.slice(0, 10).join(' • ')}
            </p>
          </div>
        )}
      </div>
    )
  }

  // Classic Template - Serif, traditional
  if (templateId === 'classic') {
    return (
      <div className="font-serif text-[11px] text-black bg-white">
        {/* Header */}
        <div className="text-center mb-2">
          <h1 className="text-lg font-bold mb-1">
            {personalDetails.fullName || 'Your Name'}
          </h1>
          <div className="flex justify-center flex-wrap gap-2 text-[10px]">
            <span>{personalDetails.email}</span>
            <span>{personalDetails.phone}</span>
            <span>{personalDetails.location}</span>
            {personalDetails.linkedIn && (
              <span className="text-black">LinkedIn</span>
            )}
          </div>
        </div>

        <div className="border-b border-black mb-3" />

        {/* Summary */}
        {personalDetails.professionalSummary && (
          <div className="mb-3">
            <h2 className="text-xs font-bold uppercase mb-1">Professional Summary</h2>
            <p className="text-[10px] leading-relaxed text-justify">
              {personalDetails.professionalSummary}
            </p>
          </div>
        )}

        {/* Experience */}
        {workExperience.length > 0 && (
          <div className="mb-3">
            <h2 className="text-xs font-bold uppercase mb-2">Professional Experience</h2>
            {workExperience.slice(0, 2).map((exp) => (
              <div key={exp.id} className="mb-2">
                <p className="font-bold text-[11px]">{exp.title}</p>
                <div className="flex justify-between text-[10px]">
                  <span className="italic">{exp.company}</span>
                  <span>{exp.startDate} - {exp.isCurrentRole ? 'Present' : exp.endDate}</span>
                </div>
                {aiBullets[exp.id]?.length > 0 && (
                  <ul className="mt-1 ml-2 space-y-0.5">
                    {aiBullets[exp.id].slice(0, 3).map((bullet, idx) => (
                      <li key={idx} className="text-[10px] flex gap-1">
                        <span>•</span>
                        <span className="line-clamp-1">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="mb-3">
            <h2 className="text-xs font-bold uppercase mb-2">Education</h2>
            {education.slice(0, 2).map((edu) => (
              <div key={edu.id} className="mb-1">
                <p className="font-bold text-[11px]">
                  {edu.degree} in {edu.fieldOfStudy}
                </p>
                <div className="flex justify-between text-[10px]">
                  <span className="italic">{edu.institution}</span>
                  <span>{edu.startDate} - {edu.endDate}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase mb-1">Skills</h2>
            <p className="text-[10px]">{skills.slice(0, 10).join(', ')}</p>
          </div>
        )}
      </div>
    )
  }

  // Compact Template - Two-column with sidebar
  if (templateId === 'compact') {
    return (
      <div className="font-sans text-[9px] text-gray-700 bg-white">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-[32%] bg-gray-100 p-3 mr-3">
            <h1 className="text-sm font-bold text-gray-900 mb-3">
              {personalDetails.fullName || 'Your Name'}
            </h1>

            {/* Contact */}
            <div className="mb-3">
              <h3 className="text-[9px] font-bold border-b border-gray-300 pb-0.5 mb-1">CONTACT</h3>
              <p className="text-[8px] text-gray-600">{personalDetails.email}</p>
              <p className="text-[8px] text-gray-600">{personalDetails.phone}</p>
              <p className="text-[8px] text-gray-600">{personalDetails.location}</p>
            </div>

            {/* Skills */}
            {skills.length > 0 && (
              <div className="mb-3">
                <h3 className="text-[9px] font-bold border-b border-gray-300 pb-0.5 mb-1">SKILLS</h3>
                {skills.slice(0, 6).map((skill, idx) => (
                  <p key={idx} className="text-[8px] text-gray-600">• {skill}</p>
                ))}
              </div>
            )}

            {/* Education */}
            {education.length > 0 && (
              <div className="mb-3">
                <h3 className="text-[9px] font-bold border-b border-gray-300 pb-0.5 mb-1">EDUCATION</h3>
                {education.slice(0, 2).map((edu) => (
                  <div key={edu.id} className="mb-1">
                    <p className="text-[8px] font-bold text-gray-800">{edu.degree}</p>
                    <p className="text-[8px] text-gray-600">{edu.institution}</p>
                    <p className="text-[7px] text-gray-500">{edu.startDate} - {edu.endDate}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Profile */}
            {personalDetails.professionalSummary && (
              <div className="mb-2">
                <h2 className="text-[10px] font-bold border-b border-gray-200 pb-0.5 mb-1">PROFILE</h2>
                <p className="text-[8px] text-gray-600 leading-relaxed">
                  {personalDetails.professionalSummary}
                </p>
              </div>
            )}

            {/* Experience */}
            {workExperience.length > 0 && (
              <div>
                <h2 className="text-[10px] font-bold border-b border-gray-200 pb-0.5 mb-1">EXPERIENCE</h2>
                {workExperience.slice(0, 2).map((exp) => (
                  <div key={exp.id} className="mb-2">
                    <div className="flex justify-between">
                      <span className="font-bold text-[9px] text-gray-900">{exp.title}</span>
                      <span className="text-[8px] text-gray-500">
                        {exp.startDate} - {exp.isCurrentRole ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <p className="text-[8px] text-gray-600">{exp.company}</p>
                    {aiBullets[exp.id]?.length > 0 && (
                      <ul className="mt-0.5 space-y-0">
                        {aiBullets[exp.id].slice(0, 2).map((bullet, idx) => (
                          <li key={idx} className="text-[8px] text-gray-600 flex gap-1">
                            <span className="text-blue-600">•</span>
                            <span className="line-clamp-1">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Canva Style Template - Two-column with teal accents
  if (templateId === 'canva') {
    return (
      <div className="font-sans text-[9px] text-gray-700 bg-white">
        {/* Header */}
        <div className="flex justify-between mb-4">
          {/* Left: Name */}
          <div>
            <h1 className="text-2xl font-normal text-gray-900">
              {personalDetails.fullName?.split(' ')[0] || 'First'}
            </h1>
            <h1 className="text-2xl font-bold text-gray-900">
              {personalDetails.fullName?.split(' ').slice(1).join(' ') || 'Last Name'}
            </h1>
            <p className="text-[10px] text-gray-500 mt-1">Professional</p>
          </div>
          {/* Right: Contact */}
          <div className="text-right space-y-1">
            <p className="text-[9px] flex items-center justify-end gap-1">
              <span className="w-3 h-3 rounded-full bg-teal-400 inline-block" />
              {personalDetails.phone}
            </p>
            <p className="text-[9px] flex items-center justify-end gap-1">
              <span className="w-3 h-3 rounded-full bg-teal-400 inline-block" />
              {personalDetails.email}
            </p>
            <p className="text-[9px] flex items-center justify-end gap-1">
              <span className="w-3 h-3 rounded-full bg-teal-400 inline-block" />
              {personalDetails.location}
            </p>
          </div>
        </div>

        {/* About */}
        {personalDetails.professionalSummary && (
          <div className="mb-3">
            <h2 className="text-xs font-bold text-gray-900 mb-1">About Me</h2>
            <p className="text-[8px] text-gray-600 leading-relaxed">
              {personalDetails.professionalSummary}
            </p>
          </div>
        )}

        {/* Two Columns */}
        <div className="flex gap-4">
          {/* Left Column */}
          <div className="w-[35%]">
            {/* Education */}
            {education.length > 0 && (
              <div className="mb-3">
                <h2 className="text-xs font-bold text-gray-900 mb-1">Education</h2>
                {education.slice(0, 2).map((edu) => (
                  <div key={edu.id} className="mb-1">
                    <p className="text-[8px] text-gray-600">{edu.institution}</p>
                    <p className="text-[8px] font-bold">{edu.degree}</p>
                    <p className="text-[7px] text-gray-500">{edu.startDate}-{edu.endDate}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Skills */}
            {skills.length > 0 && (
              <div className="mb-3">
                <h2 className="text-xs font-bold text-gray-900 mb-1">Skills</h2>
                {skills.slice(0, 5).map((skill, idx) => (
                  <p key={idx} className="text-[8px] text-gray-600">• {skill}</p>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Experience */}
          <div className="flex-1">
            {workExperience.length > 0 && (
              <div>
                <h2 className="text-xs font-bold text-gray-900 mb-1">Experience</h2>
                {workExperience.slice(0, 2).map((exp) => (
                  <div key={exp.id} className="mb-2">
                    <p className="text-[9px] font-bold">{exp.title}</p>
                    <p className="text-[8px] text-gray-600">{exp.company}</p>
                    <p className="text-[7px] text-gray-500 mb-1">
                      {exp.startDate}-{exp.isCurrentRole ? 'Present' : exp.endDate}
                    </p>
                    {aiBullets[exp.id]?.slice(0, 2).map((bullet, idx) => (
                      <p key={idx} className="text-[8px] text-gray-600 flex gap-1">
                        <span>•</span>
                        <span className="line-clamp-1">{bullet}</span>
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Executive Template - Elegant serif with spacing
  return (
    <div className="font-serif text-[10px] text-gray-800 bg-white">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 tracking-wider uppercase mb-2">
          {personalDetails.fullName || 'Your Name'}
        </h1>
        <div className="h-px bg-amber-700 mx-auto w-20 mb-3" />
        <p className="text-[9px] text-gray-500">
          {[personalDetails.email, personalDetails.phone, personalDetails.location]
            .filter(Boolean)
            .join(' • ')}
        </p>
      </div>

      {/* Executive Summary */}
      {personalDetails.professionalSummary && (
        <div className="mb-4">
          <h2 className="text-[11px] font-bold uppercase tracking-widest border-b border-amber-700/50 pb-1 mb-2">
            Executive Summary
          </h2>
          <p className="text-[10px] text-gray-600 leading-relaxed text-justify">
            {personalDetails.professionalSummary}
          </p>
        </div>
      )}

      {/* Professional Experience */}
      {workExperience.length > 0 && (
        <div className="mb-4">
          <h2 className="text-[11px] font-bold uppercase tracking-widest border-b border-amber-700/50 pb-1 mb-2">
            Professional Experience
          </h2>
          {workExperience.slice(0, 2).map((exp) => (
            <div key={exp.id} className="mb-3">
              <div className="flex justify-between">
                <div>
                  <p className="font-bold text-[11px] text-gray-900">{exp.title}</p>
                  <p className="text-[10px] text-gray-500 italic">{exp.company}</p>
                </div>
                <span className="text-[9px] text-gray-500">
                  {exp.startDate} — {exp.isCurrentRole ? 'Present' : exp.endDate}
                </span>
              </div>
              {aiBullets[exp.id]?.length > 0 && (
                <ul className="mt-1 space-y-0.5">
                  {aiBullets[exp.id].slice(0, 3).map((bullet, idx) => (
                    <li key={idx} className="text-[10px] text-gray-600 flex gap-2">
                      <span className="text-amber-700">■</span>
                      <span className="line-clamp-1">{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-4">
          <h2 className="text-[11px] font-bold uppercase tracking-widest border-b border-amber-700/50 pb-1 mb-2">
            Education
          </h2>
          {education.slice(0, 2).map((edu) => (
            <div key={edu.id} className="mb-1">
              <div className="flex justify-between">
                <div>
                  <p className="font-bold text-[11px] text-gray-900">
                    {edu.degree}, {edu.fieldOfStudy}
                  </p>
                  <p className="text-[10px] text-gray-500 italic">{edu.institution}</p>
                </div>
                <span className="text-[9px] text-gray-500">{edu.startDate} — {edu.endDate}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Core Competencies */}
      {skills.length > 0 && (
        <div>
          <h2 className="text-[11px] font-bold uppercase tracking-widest border-b border-amber-700/50 pb-1 mb-2">
            Core Competencies
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.slice(0, 8).map((skill, idx) => (
              <span key={idx} className="text-[9px] text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
