import type { ResumeData, TemplateId } from '@/types/resume'

interface ResumePreviewProps {
  data: ResumeData
  aiBullets: Record<string, string[]>
  templateId: TemplateId
}

export function ResumePreview({ data, aiBullets, templateId }: ResumePreviewProps) {
  const { personalDetails, workExperience, education, skills } = data

  // Clarity Template - Modern/Minimalist with blue accent
  if (templateId === 'clarity') {
    return (
      <div className="font-sans text-[10px] text-gray-900 bg-white">
        {/* Header */}
        <div className="mb-4">
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
          <div className="h-0.5 bg-blue-600 mt-2 w-16" />
        </div>

        {/* Summary */}
        {personalDetails.professionalSummary && (
          <div className="mb-3">
            <h2 className="text-[11px] font-bold uppercase tracking-wide border-b border-gray-200 pb-1 mb-2">
              Summary
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

  // Heritage Template - Classic/Traditional with serif and gold accents
  if (templateId === 'heritage') {
    return (
      <div className="font-serif text-[11px] text-black bg-white">
        {/* Header */}
        <div className="text-center mb-2">
          <h1 className="text-lg font-bold mb-1 uppercase tracking-wider">
            {personalDetails.fullName || 'Your Name'}
          </h1>
          <div className="h-px bg-amber-700 mx-auto w-24 mb-2" />
          <div className="flex justify-center flex-wrap gap-2 text-[10px]">
            <span>{personalDetails.email}</span>
            <span className="text-amber-700">|</span>
            <span>{personalDetails.phone}</span>
            <span className="text-amber-700">|</span>
            <span>{personalDetails.location}</span>
          </div>
        </div>

        {/* Summary */}
        {personalDetails.professionalSummary && (
          <div className="mb-3">
            <h2 className="text-xs font-bold uppercase mb-1 border-b border-amber-700/50 pb-1">
              Professional Summary
            </h2>
            <p className="text-[10px] leading-relaxed text-justify">
              {personalDetails.professionalSummary}
            </p>
          </div>
        )}

        {/* Experience */}
        {workExperience.length > 0 && (
          <div className="mb-3">
            <h2 className="text-xs font-bold uppercase mb-2 border-b border-amber-700/50 pb-1">
              Professional Experience
            </h2>
            {workExperience.slice(0, 2).map((exp) => (
              <div key={exp.id} className="mb-2">
                <div className="flex justify-between">
                  <span className="font-bold text-[11px]">{exp.title}</span>
                  <span className="text-[10px]">
                    {exp.startDate} - {exp.isCurrentRole ? 'Present' : exp.endDate}
                  </span>
                </div>
                <p className="italic text-[10px]">{exp.company}</p>
                {aiBullets[exp.id]?.length > 0 && (
                  <ul className="mt-1 ml-2 space-y-0.5">
                    {aiBullets[exp.id].slice(0, 3).map((bullet, idx) => (
                      <li key={idx} className="text-[10px] flex gap-1">
                        <span className="text-amber-700">•</span>
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
            <h2 className="text-xs font-bold uppercase mb-2 border-b border-amber-700/50 pb-1">
              Education
            </h2>
            {education.slice(0, 2).map((edu) => (
              <div key={edu.id} className="mb-1">
                <div className="flex justify-between">
                  <span className="font-bold text-[11px]">
                    {edu.degree} in {edu.fieldOfStudy}
                  </span>
                  <span className="text-[10px]">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
                <p className="italic text-[10px]">{edu.institution}</p>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase mb-1 border-b border-amber-700/50 pb-1">
              Skills
            </h2>
            <p className="text-[10px]">{skills.slice(0, 10).join('  •  ')}</p>
          </div>
        )}
      </div>
    )
  }

  // Impact Template - Creative with teal sidebar
  if (templateId === 'impact') {
    return (
      <div className="font-sans text-[9px] text-gray-700 bg-white">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-[32%] bg-teal-600 p-3 mr-3 text-white">
            <h1 className="text-sm font-bold mb-3">
              {personalDetails.fullName || 'Your Name'}
            </h1>

            {/* Contact */}
            <div className="mb-3">
              <h3 className="text-[9px] font-bold border-b border-white/30 pb-0.5 mb-1">CONTACT</h3>
              <p className="text-[8px] text-white/90">{personalDetails.email}</p>
              <p className="text-[8px] text-white/90">{personalDetails.phone}</p>
              <p className="text-[8px] text-white/90">{personalDetails.location}</p>
            </div>

            {/* Skills */}
            {skills.length > 0 && (
              <div className="mb-3">
                <h3 className="text-[9px] font-bold border-b border-white/30 pb-0.5 mb-1">SKILLS</h3>
                {skills.slice(0, 6).map((skill, idx) => (
                  <p key={idx} className="text-[8px] text-white/90 pl-2">{skill}</p>
                ))}
              </div>
            )}

            {/* Education in sidebar */}
            {education.length > 0 && (
              <div className="mb-3">
                <h3 className="text-[9px] font-bold border-b border-white/30 pb-0.5 mb-1">EDUCATION</h3>
                {education.slice(0, 2).map((edu) => (
                  <div key={edu.id} className="mb-1">
                    <p className="text-[8px] font-bold text-white">{edu.degree}</p>
                    <p className="text-[8px] text-white/80">{edu.institution}</p>
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
                <h2 className="text-[10px] font-bold text-teal-600 border-b border-gray-200 pb-0.5 mb-1">
                  SUMMARY
                </h2>
                <p className="text-[8px] text-gray-600 leading-relaxed">
                  {personalDetails.professionalSummary}
                </p>
              </div>
            )}

            {/* Experience */}
            {workExperience.length > 0 && (
              <div>
                <h2 className="text-[10px] font-bold text-teal-600 border-b border-gray-200 pb-0.5 mb-1">
                  EXPERIENCE
                </h2>
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
                            <span className="text-teal-600">•</span>
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

  // Precision Template - ATS-friendly, simple black and white
  if (templateId === 'precision') {
    return (
      <div className="font-sans text-[10px] text-black bg-white">
        {/* Header */}
        <div className="mb-3">
          <h1 className="text-base font-bold mb-1">
            {personalDetails.fullName || 'Your Name'}
          </h1>
          <p className="text-[9px] text-gray-700">
            {[personalDetails.email, personalDetails.phone, personalDetails.location]
              .filter(Boolean)
              .join(' | ')}
          </p>
        </div>

        {/* Summary */}
        {personalDetails.professionalSummary && (
          <div className="mb-3 border-t border-black pt-2">
            <h2 className="text-[11px] font-bold uppercase mb-1">Summary</h2>
            <p className="text-[9px] text-gray-700 leading-relaxed">
              {personalDetails.professionalSummary}
            </p>
          </div>
        )}

        {/* Experience */}
        {workExperience.length > 0 && (
          <div className="mb-3 border-t border-black pt-2">
            <h2 className="text-[11px] font-bold uppercase mb-2">Experience</h2>
            {workExperience.slice(0, 2).map((exp) => (
              <div key={exp.id} className="mb-2">
                <div className="flex justify-between">
                  <span className="font-bold text-[10px]">{exp.title}</span>
                  <span className="text-[9px] text-gray-600">
                    {exp.startDate} - {exp.isCurrentRole ? 'Present' : exp.endDate}
                  </span>
                </div>
                <p className="text-[9px] text-gray-700">{exp.company}</p>
                {aiBullets[exp.id]?.length > 0 && (
                  <ul className="mt-1 space-y-0.5">
                    {aiBullets[exp.id].slice(0, 3).map((bullet, idx) => (
                      <li key={idx} className="text-[9px] text-gray-700 flex gap-1">
                        <span>-</span>
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
          <div className="mb-3 border-t border-black pt-2">
            <h2 className="text-[11px] font-bold uppercase mb-2">Education</h2>
            {education.slice(0, 2).map((edu) => (
              <div key={edu.id} className="mb-1">
                <div className="flex justify-between">
                  <span className="font-bold text-[10px]">
                    {edu.degree} in {edu.fieldOfStudy}
                  </span>
                  <span className="text-[9px] text-gray-600">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
                <p className="text-[9px] text-gray-700">{edu.institution}</p>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="border-t border-black pt-2">
            <h2 className="text-[11px] font-bold uppercase mb-1">Skills</h2>
            <p className="text-[9px] text-gray-700">{skills.slice(0, 10).join(', ')}</p>
          </div>
        )}
      </div>
    )
  }

  // Executive Edge Template - Elegant serif with gold accents (default)
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
          <p className="text-[9px] text-gray-600">
            {skills.slice(0, 8).join('   •   ')}
          </p>
        </div>
      )}
    </div>
  )
}
