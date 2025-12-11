import React, { useState } from 'react';
import { useData, confirmDelete } from '../context/DataContext';
import { Briefcase, GraduationCap, Award, Beaker, Code, Plus, Edit2, Check, X, Trash2, Download } from 'lucide-react';
import { Education, Project, Award as AwardType, Research, WorkExperience } from '../types';
import { useAuth } from '../context/AuthContext';

const Resume: React.FC = () => {
  const { 
    educationData, addEducation, updateEducation, deleteEducation,
    projectData, addProject, updateProject, deleteProject,
    awardData, addAward, updateAward, deleteAward,
    researchData, addResearch, updateResearch, deleteResearch,
    workData, addWorkItem, updateWorkItem, deleteWorkItem
  } = useData();
  const { isAdmin } = useAuth();

  // --- Add/Edit States for each section ---
  const [addingSection, setAddingSection] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<{section: string, id: number} | null>(null);
  
  // Generic form state handlers
  const [eduForm, setEduForm] = useState<Partial<Education>>({});
  const [projForm, setProjForm] = useState<Partial<Project>>({});
  const [awardForm, setAwardForm] = useState<Partial<AwardType>>({});
  const [resForm, setResForm] = useState<Partial<Research>>({});
  const [workForm, setWorkForm] = useState<Partial<WorkExperience>>({ description: [] });

  // --- Generic Delete Handler with Confirmation ---
  const handleDelete = (e: React.MouseEvent, type: 'edu' | 'work' | 'proj' | 'res' | 'award', id: number) => {
    e.stopPropagation(); // 阻止事件冒泡
    if (confirmDelete()) {
        switch(type) {
            case 'edu': deleteEducation(id); break;
            case 'work': deleteWorkItem(id); break;
            case 'proj': deleteProject(id); break;
            case 'res': deleteResearch(id); break;
            case 'award': deleteAward(id); break;
        }
    }
  };

  // --- Handlers for Education ---
  const handleAddEdu = () => {
      if (eduForm.school && eduForm.period) {
          addEducation({ ...eduForm, id: Date.now() } as Education);
          setAddingSection(null);
          setEduForm({});
      }
  };
  const startEditEdu = (item: Education) => {
      setEditingId({ section: 'edu', id: item.id });
      setEduForm(item);
  };
  const saveEdu = (id: number) => {
      updateEducation(id, eduForm);
      setEditingId(null);
      setEduForm({});
  };

  // --- Handlers for Projects ---
  const handleAddProj = () => {
      if (projForm.name) {
          addProject({ ...projForm, id: Date.now() } as Project);
          setAddingSection(null);
          setProjForm({});
      }
  };
  const startEditProj = (item: Project) => {
      setEditingId({ section: 'proj', id: item.id });
      setProjForm(item);
  };
  const saveProj = (id: number) => {
      updateProject(id, projForm);
      setEditingId(null);
      setProjForm({});
  };

  // --- Handlers for Awards ---
  const handleAddAward = () => {
      if (awardForm.name) {
          addAward({ ...awardForm, id: Date.now() } as AwardType);
          setAddingSection(null);
          setAwardForm({});
      }
  };
  const startEditAward = (item: AwardType) => {
      setEditingId({ section: 'award', id: item.id });
      setAwardForm(item);
  };
  const saveAward = (id: number) => {
      updateAward(id, awardForm);
      setEditingId(null);
      setAwardForm({});
  };

  // --- Handlers for Research ---
  const handleAddResearch = () => {
      if (resForm.title) {
          addResearch({ ...resForm, id: Date.now() } as Research);
          setAddingSection(null);
          setResForm({});
      }
  };
  const startEditResearch = (item: Research) => {
      setEditingId({ section: 'res', id: item.id });
      setResForm(item);
  };
  const saveResearch = (id: number) => {
      updateResearch(id, resForm);
      setEditingId(null);
      setResForm({});
  };

  // --- Handlers for Work ---
  const handleAddWork = () => {
      if (workForm.company) {
          addWorkItem({ ...workForm, id: Date.now(), description: workForm.description || [] } as WorkExperience);
          setAddingSection(null);
          setWorkForm({ description: [] });
      }
  };
  const startEditWork = (item: WorkExperience) => {
      setEditingId({ section: 'work', id: item.id });
      setWorkForm(item);
  };
  const saveWork = (id: number) => {
      updateWorkItem(id, workForm);
      setEditingId(null);
      setWorkForm({ description: [] });
  };
  const handleWorkDescChange = (idx: number, val: string) => {
      const newDesc = [...(workForm.description || [])];
      newDesc[idx] = val;
      setWorkForm({ ...workForm, description: newDesc });
  };
  const addWorkDescLine = () => {
      setWorkForm({ ...workForm, description: [...(workForm.description || []), ""] });
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 animate-fade-in pb-32">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 pb-8 border-b border-apple-200">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-apple-900">个人履历</h1>
          <p className="text-apple-500 mt-2 text-lg">我的教育背景、职业经历与技能树。</p>
        </div>
        <button className="flex items-center space-x-2 px-5 py-2.5 bg-apple-900 text-white rounded-full hover:bg-apple-500 transition-colors shadow-sm text-sm font-medium mt-4 md:mt-0">
            <Download size={16} />
            <span>下载 PDF</span>
        </button>
      </div>

      <div className="space-y-16">
          
          {/* --- EDUCATION SECTION --- */}
          <section className="relative group/section">
              <div className="flex items-center justify-between mb-8">
                  <h3 className="flex items-center text-lg font-bold uppercase tracking-widest text-apple-400">
                      <GraduationCap className="mr-2" size={20}/> 教育经历
                  </h3>
                  {isAdmin && <button onClick={() => setAddingSection('edu')} className="p-1 rounded bg-apple-50 hover:bg-apple-200 text-apple-500"><Plus size={16}/></button>}
              </div>
              
              {addingSection === 'edu' && (
                  <div className="mb-6 p-4 border rounded-xl bg-apple-50 space-y-3">
                      <div className="flex gap-2">
                        <input className="flex-1 p-2 border rounded" placeholder="学校名称" value={eduForm.school || ''} onChange={e => setEduForm({...eduForm, school: e.target.value})} />
                        <select className="p-2 border rounded" value={eduForm.stage || ''} onChange={e => setEduForm({...eduForm, stage: e.target.value})}>
                            <option value="">阶段</option>
                            <option value="硕士">硕士</option>
                            <option value="本科">本科</option>
                            <option value="高中">高中</option>
                            <option value="初中">初中</option>
                        </select>
                      </div>
                      <div className="flex gap-2">
                          <input className="w-1/3 p-2 border rounded" placeholder="时间段 (如: 2019-2023)" value={eduForm.period || ''} onChange={e => setEduForm({...eduForm, period: e.target.value})} />
                          <input className="flex-1 p-2 border rounded" placeholder="专业 (如适用)" value={eduForm.major || ''} onChange={e => setEduForm({...eduForm, major: e.target.value})} />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                           <input className="p-2 border rounded" placeholder="高考成绩 (高中)" value={eduForm.gaokaoScore || ''} onChange={e => setEduForm({...eduForm, gaokaoScore: e.target.value})} />
                           <input className="p-2 border rounded" placeholder="绩点 (GPA)" value={eduForm.gpa || ''} onChange={e => setEduForm({...eduForm, gpa: e.target.value})} />
                           <input className="p-2 border rounded" placeholder="排名" value={eduForm.rank || ''} onChange={e => setEduForm({...eduForm, rank: e.target.value})} />
                           <input className="p-2 border rounded" placeholder="英语成绩 (四六级)" value={eduForm.english || ''} onChange={e => setEduForm({...eduForm, english: e.target.value})} />
                           <input className="p-2 border rounded col-span-2" placeholder="入学方式 (如: 保研、考研)" value={eduForm.admissionMethod || ''} onChange={e => setEduForm({...eduForm, admissionMethod: e.target.value})} />
                      </div>
                      <div className="flex justify-end gap-2">
                          <button onClick={() => setAddingSection(null)} className="text-sm px-3 py-1">取消</button>
                          <button onClick={handleAddEdu} className="text-sm px-3 py-1 bg-apple-900 text-white rounded">添加</button>
                      </div>
                  </div>
              )}

              <div className="space-y-8">
                  {educationData.map(edu => (
                      <div key={edu.id} className="relative group hover:bg-apple-50/50 p-4 rounded-xl -mx-4 transition-colors">
                          {/* Actions - Admin Only */}
                          {isAdmin && (
                            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                {editingId?.section === 'edu' && editingId.id === edu.id ? (
                                    <>
                                        <button onClick={() => saveEdu(edu.id)} className="p-1.5 bg-green-500 text-white rounded"><Check size={14}/></button>
                                        <button onClick={() => setEditingId(null)} className="p-1.5 bg-red-500 text-white rounded"><X size={14}/></button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => startEditEdu(edu)} className="p-1.5 bg-white border shadow-sm rounded text-apple-600"><Edit2 size={14}/></button>
                                        <button onClick={(e) => handleDelete(e, 'edu', edu.id)} className="p-1.5 bg-white border shadow-sm rounded text-red-500 hover:bg-red-50"><Trash2 size={14}/></button>
                                    </>
                                )}
                            </div>
                          )}

                          {editingId?.section === 'edu' && editingId.id === edu.id ? (
                              <div className="space-y-2">
                                  <div className="flex gap-2">
                                      <input className="flex-1 border rounded px-2 py-1" value={eduForm.school} onChange={e => setEduForm({...eduForm, school: e.target.value})} />
                                      <input className="w-24 border rounded px-2 py-1" value={eduForm.period} onChange={e => setEduForm({...eduForm, period: e.target.value})} />
                                  </div>
                                  <div className="grid grid-cols-2 gap-2">
                                      <input className="border rounded px-2 py-1" placeholder="专业" value={eduForm.major || ''} onChange={e => setEduForm({...eduForm, major: e.target.value})} />
                                      <input className="border rounded px-2 py-1" placeholder="阶段" value={eduForm.stage || ''} onChange={e => setEduForm({...eduForm, stage: e.target.value})} />
                                      <input className="border rounded px-2 py-1" placeholder="绩点" value={eduForm.gpa || ''} onChange={e => setEduForm({...eduForm, gpa: e.target.value})} />
                                      <input className="border rounded px-2 py-1" placeholder="排名" value={eduForm.rank || ''} onChange={e => setEduForm({...eduForm, rank: e.target.value})} />
                                      <input className="border rounded px-2 py-1" placeholder="英语成绩" value={eduForm.english || ''} onChange={e => setEduForm({...eduForm, english: e.target.value})} />
                                      <input className="border rounded px-2 py-1" placeholder="高考成绩" value={eduForm.gaokaoScore || ''} onChange={e => setEduForm({...eduForm, gaokaoScore: e.target.value})} />
                                      <input className="border rounded px-2 py-1 col-span-2" placeholder="入学方式" value={eduForm.admissionMethod || ''} onChange={e => setEduForm({...eduForm, admissionMethod: e.target.value})} />
                                  </div>
                              </div>
                          ) : (
                              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                  <div className="col-span-1 text-apple-400 font-medium text-sm pt-1">{edu.period}</div>
                                  <div className="col-span-3">
                                      <div className="flex justify-between items-baseline mb-1">
                                          <h4 className="text-xl font-bold text-apple-900">{edu.school}</h4>
                                          <span className="text-sm font-semibold text-apple-500 bg-apple-100 px-2 py-0.5 rounded">{edu.stage}</span>
                                      </div>
                                      {edu.major && <div className="text-apple-600 font-medium mb-2">{edu.major}</div>}
                                      
                                      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-apple-500">
                                          {edu.admissionMethod && <div><span className="font-semibold text-apple-400">入学方式:</span> {edu.admissionMethod}</div>}
                                          {edu.gaokaoScore && <div><span className="font-semibold text-apple-400">高考成绩:</span> {edu.gaokaoScore}</div>}
                                          {edu.gpa && <div><span className="font-semibold text-apple-400">绩点:</span> {edu.gpa}</div>}
                                          {edu.rank && <div><span className="font-semibold text-apple-400">排名:</span> {edu.rank}</div>}
                                          {edu.english && <div><span className="font-semibold text-apple-400">英语:</span> {edu.english}</div>}
                                      </div>
                                  </div>
                              </div>
                          )}
                      </div>
                  ))}
              </div>
          </section>

          {/* --- WORK EXPERIENCE SECTION --- */}
          <section className="relative group/section border-t border-apple-100 pt-10">
              <div className="flex items-center justify-between mb-8">
                  <h3 className="flex items-center text-lg font-bold uppercase tracking-widest text-apple-400">
                      <Briefcase className="mr-2" size={20}/> 实习/工作经历
                  </h3>
                  {isAdmin && <button onClick={() => setAddingSection('work')} className="p-1 rounded bg-apple-50 hover:bg-apple-200 text-apple-500"><Plus size={16}/></button>}
              </div>

               {addingSection === 'work' && (
                  <div className="mb-6 p-4 border rounded-xl bg-apple-50 space-y-3">
                      <div className="flex gap-2">
                        <input className="flex-1 p-2 border rounded" placeholder="公司名称" value={workForm.company || ''} onChange={e => setWorkForm({...workForm, company: e.target.value})} />
                        <input className="w-1/3 p-2 border rounded" placeholder="时间段" value={workForm.period || ''} onChange={e => setWorkForm({...workForm, period: e.target.value})} />
                      </div>
                      <input className="w-full p-2 border rounded" placeholder="职位/角色" value={workForm.role || ''} onChange={e => setWorkForm({...workForm, role: e.target.value})} />
                      <div className="space-y-2">
                        <label className="text-xs text-apple-400">工作描述 (每行一条)</label>
                        {(workForm.description || []).map((desc, i) => (
                             <input key={i} className="w-full p-2 border rounded text-sm" value={desc} onChange={e => handleWorkDescChange(i, e.target.value)} />
                        ))}
                        <button onClick={addWorkDescLine} className="text-xs text-blue-500">+ 添加一行</button>
                      </div>
                      <div className="flex justify-end gap-2">
                          <button onClick={() => setAddingSection(null)} className="text-sm px-3 py-1">取消</button>
                          <button onClick={handleAddWork} className="text-sm px-3 py-1 bg-apple-900 text-white rounded">添加</button>
                      </div>
                  </div>
              )}

              <div className="space-y-10">
                  {workData.map(work => (
                      <div key={work.id} className="relative group hover:bg-apple-50/50 p-4 rounded-xl -mx-4 transition-colors">
                          {isAdmin && (
                            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                {editingId?.section === 'work' && editingId.id === work.id ? (
                                    <>
                                        <button onClick={() => saveWork(work.id)} className="p-1.5 bg-green-500 text-white rounded"><Check size={14}/></button>
                                        <button onClick={() => setEditingId(null)} className="p-1.5 bg-red-500 text-white rounded"><X size={14}/></button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => startEditWork(work)} className="p-1.5 bg-white border shadow-sm rounded text-apple-600"><Edit2 size={14}/></button>
                                        <button onClick={(e) => handleDelete(e, 'work', work.id)} className="p-1.5 bg-white border shadow-sm rounded text-red-500 hover:bg-red-50"><Trash2 size={14}/></button>
                                    </>
                                )}
                            </div>
                          )}

                          {editingId?.section === 'work' && editingId.id === work.id ? (
                               <div className="space-y-2">
                                  <input className="w-full border rounded px-2 py-1" value={workForm.company} onChange={e => setWorkForm({...workForm, company: e.target.value})} />
                                  <div className="flex gap-2">
                                      <input className="flex-1 border rounded px-2 py-1" value={workForm.role} onChange={e => setWorkForm({...workForm, role: e.target.value})} />
                                      <input className="w-24 border rounded px-2 py-1" value={workForm.period} onChange={e => setWorkForm({...workForm, period: e.target.value})} />
                                  </div>
                                   <div className="space-y-1">
                                    {(workForm.description || []).map((desc, i) => (
                                        <input key={i} className="w-full border rounded px-2 py-1 text-sm" value={desc} onChange={e => handleWorkDescChange(i, e.target.value)} />
                                    ))}
                                    <button onClick={addWorkDescLine} className="text-xs text-blue-500">+ 添加一行</button>
                                  </div>
                               </div>
                          ) : (
                              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                  <div className="col-span-1 text-apple-400 font-medium text-sm pt-1">{work.period}</div>
                                  <div className="col-span-3">
                                      <h4 className="text-xl font-bold text-apple-900 mb-1">{work.company}</h4>
                                      <div className="text-lg text-apple-600 font-medium mb-3">{work.role}</div>
                                      <ul className="space-y-2">
                                          {work.description.map((point, i) => (
                                              <li key={i} className="flex items-start text-apple-500 leading-relaxed text-sm">
                                                  <span className="mr-3 mt-1.5 block w-1.5 h-1.5 rounded-full bg-apple-300 shrink-0" />
                                                  <span>{point}</span>
                                              </li>
                                          ))}
                                      </ul>
                                  </div>
                              </div>
                          )}
                      </div>
                  ))}
              </div>
          </section>

          {/* --- PROJECTS SECTION --- */}
          <section className="relative group/section border-t border-apple-100 pt-10">
              <div className="flex items-center justify-between mb-8">
                  <h3 className="flex items-center text-lg font-bold uppercase tracking-widest text-apple-400">
                      <Code className="mr-2" size={20}/> 项目经历
                  </h3>
                   {isAdmin && <button onClick={() => setAddingSection('proj')} className="p-1 rounded bg-apple-50 hover:bg-apple-200 text-apple-500"><Plus size={16}/></button>}
              </div>

               {addingSection === 'proj' && (
                  <div className="mb-6 p-4 border rounded-xl bg-apple-50 space-y-3">
                      <div className="flex gap-2">
                        <input className="flex-1 p-2 border rounded" placeholder="项目名称" value={projForm.name || ''} onChange={e => setProjForm({...projForm, name: e.target.value})} />
                        <input className="w-1/3 p-2 border rounded" placeholder="时间" value={projForm.period || ''} onChange={e => setProjForm({...projForm, period: e.target.value})} />
                      </div>
                      <input className="w-full p-2 border rounded" placeholder="角色/职责" value={projForm.role || ''} onChange={e => setProjForm({...projForm, role: e.target.value})} />
                      <textarea className="w-full p-2 border rounded" rows={2} placeholder="项目描述" value={projForm.description || ''} onChange={e => setProjForm({...projForm, description: e.target.value})} />
                      <div className="flex justify-end gap-2">
                          <button onClick={() => setAddingSection(null)} className="text-sm px-3 py-1">取消</button>
                          <button onClick={handleAddProj} className="text-sm px-3 py-1 bg-apple-900 text-white rounded">添加</button>
                      </div>
                  </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {projectData.map(proj => (
                      <div key={proj.id} className="relative group p-6 rounded-2xl bg-white border border-apple-100 shadow-sm hover:shadow-md transition-all">
                           {isAdmin && (
                            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                {editingId?.section === 'proj' && editingId.id === proj.id ? (
                                    <>
                                        <button onClick={() => saveProj(proj.id)} className="p-1.5 bg-green-500 text-white rounded"><Check size={14}/></button>
                                        <button onClick={() => setEditingId(null)} className="p-1.5 bg-red-500 text-white rounded"><X size={14}/></button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => startEditProj(proj)} className="p-1.5 bg-apple-50 hover:bg-white border rounded text-apple-600"><Edit2 size={14}/></button>
                                        <button onClick={(e) => handleDelete(e, 'proj', proj.id)} className="p-1.5 bg-apple-50 hover:bg-white border rounded text-red-500 hover:bg-red-50"><Trash2 size={14}/></button>
                                    </>
                                )}
                            </div>
                           )}

                          {editingId?.section === 'proj' && editingId.id === proj.id ? (
                              <div className="space-y-2">
                                  <input className="w-full border rounded p-1" value={projForm.name} onChange={e => setProjForm({...projForm, name: e.target.value})} />
                                  <input className="w-full border rounded p-1" value={projForm.role} onChange={e => setProjForm({...projForm, role: e.target.value})} />
                                  <input className="w-full border rounded p-1" value={projForm.period} onChange={e => setProjForm({...projForm, period: e.target.value})} />
                                  <textarea className="w-full border rounded p-1" value={projForm.description} onChange={e => setProjForm({...projForm, description: e.target.value})} />
                              </div>
                          ) : (
                              <>
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-apple-900 text-lg">{proj.name}</h4>
                                    <span className="text-xs font-medium text-apple-400 bg-apple-50 px-2 py-1 rounded-full">{proj.period}</span>
                                </div>
                                <div className="text-apple-600 text-sm font-medium mb-3">{proj.role}</div>
                                <p className="text-apple-500 text-sm leading-relaxed">{proj.description}</p>
                              </>
                          )}
                      </div>
                  ))}
              </div>
          </section>

          {/* --- RESEARCH SECTION --- */}
          <section className="relative group/section border-t border-apple-100 pt-10">
              <div className="flex items-center justify-between mb-8">
                  <h3 className="flex items-center text-lg font-bold uppercase tracking-widest text-apple-400">
                      <Beaker className="mr-2" size={20}/> 科研成果
                  </h3>
                   {isAdmin && <button onClick={() => setAddingSection('res')} className="p-1 rounded bg-apple-50 hover:bg-apple-200 text-apple-500"><Plus size={16}/></button>}
              </div>

               {addingSection === 'res' && (
                  <div className="mb-6 p-4 border rounded-xl bg-apple-50 space-y-3">
                      <input className="w-full p-2 border rounded" placeholder="论文题目" value={resForm.title || ''} onChange={e => setResForm({...resForm, title: e.target.value})} />
                      <div className="flex gap-2">
                        <input className="flex-1 p-2 border rounded" placeholder="期刊/会议" value={resForm.publication || ''} onChange={e => setResForm({...resForm, publication: e.target.value})} />
                        <input className="w-1/3 p-2 border rounded" placeholder="发表日期" value={resForm.date || ''} onChange={e => setResForm({...resForm, date: e.target.value})} />
                      </div>
                      <textarea className="w-full p-2 border rounded" rows={2} placeholder="简介" value={resForm.description || ''} onChange={e => setResForm({...resForm, description: e.target.value})} />
                      <div className="flex justify-end gap-2">
                          <button onClick={() => setAddingSection(null)} className="text-sm px-3 py-1">取消</button>
                          <button onClick={handleAddResearch} className="text-sm px-3 py-1 bg-apple-900 text-white rounded">添加</button>
                      </div>
                  </div>
              )}

              <div className="space-y-4">
                   {researchData.map(res => (
                       <div key={res.id} className="relative group p-4 border-l-2 border-apple-200 hover:border-apple-400 transition-colors pl-6">
                            {isAdmin && (
                                <div className="absolute top-2 right-0 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    {editingId?.section === 'res' && editingId.id === res.id ? (
                                        <>
                                            <button onClick={() => saveResearch(res.id)} className="p-1.5 bg-green-500 text-white rounded"><Check size={14}/></button>
                                            <button onClick={() => setEditingId(null)} className="p-1.5 bg-red-500 text-white rounded"><X size={14}/></button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => startEditResearch(res)} className="p-1.5 bg-apple-50 hover:bg-white rounded text-apple-600"><Edit2 size={14}/></button>
                                            <button onClick={(e) => handleDelete(e, 'res', res.id)} className="p-1.5 bg-apple-50 hover:bg-white rounded text-red-500 hover:bg-red-50"><Trash2 size={14}/></button>
                                        </>
                                    )}
                                </div>
                            )}

                          {editingId?.section === 'res' && editingId.id === res.id ? (
                               <div className="space-y-2">
                                  <input className="w-full border rounded p-1" value={resForm.title} onChange={e => setResForm({...resForm, title: e.target.value})} />
                                  <div className="flex gap-2">
                                    <input className="flex-1 border rounded p-1" value={resForm.publication} onChange={e => setResForm({...resForm, publication: e.target.value})} />
                                    <input className="w-24 border rounded p-1" value={resForm.date} onChange={e => setResForm({...resForm, date: e.target.value})} />
                                  </div>
                                  <textarea className="w-full border rounded p-1" value={resForm.description} onChange={e => setResForm({...resForm, description: e.target.value})} />
                               </div>
                          ) : (
                               <>
                                <h4 className="text-lg font-semibold text-apple-900">{res.title}</h4>
                                <div className="text-sm text-apple-500 mb-2 italic">{res.publication}, {res.date}</div>
                                <p className="text-apple-500 text-sm">{res.description}</p>
                               </>
                          )}
                       </div>
                   ))}
              </div>
          </section>

          {/* --- AWARDS SECTION --- */}
          <section className="relative group/section border-t border-apple-100 pt-10">
              <div className="flex items-center justify-between mb-8">
                  <h3 className="flex items-center text-lg font-bold uppercase tracking-widest text-apple-400">
                      <Award className="mr-2" size={20}/> 荣誉奖项
                  </h3>
                   {isAdmin && <button onClick={() => setAddingSection('award')} className="p-1 rounded bg-apple-50 hover:bg-apple-200 text-apple-500"><Plus size={16}/></button>}
              </div>

               {addingSection === 'award' && (
                  <div className="mb-6 p-4 border rounded-xl bg-apple-50 space-y-3">
                      <input className="w-full p-2 border rounded" placeholder="奖项名称" value={awardForm.name || ''} onChange={e => setAwardForm({...awardForm, name: e.target.value})} />
                      <div className="flex gap-2">
                        <input className="flex-1 p-2 border rounded" placeholder="级别 (国家级, 省级...)" value={awardForm.level || ''} onChange={e => setAwardForm({...awardForm, level: e.target.value})} />
                        <input className="w-1/3 p-2 border rounded" placeholder="日期" value={awardForm.date || ''} onChange={e => setAwardForm({...awardForm, date: e.target.value})} />
                      </div>
                      <div className="flex justify-end gap-2">
                          <button onClick={() => setAddingSection(null)} className="text-sm px-3 py-1">取消</button>
                          <button onClick={handleAddAward} className="text-sm px-3 py-1 bg-apple-900 text-white rounded">添加</button>
                      </div>
                  </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {awardData.map(award => (
                      <div key={award.id} className="relative group flex items-center justify-between p-4 bg-apple-50/50 rounded-lg">
                           {isAdmin && (
                            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                {editingId?.section === 'award' && editingId.id === award.id ? (
                                    <>
                                        <button onClick={() => saveAward(award.id)} className="p-1 bg-green-500 text-white rounded"><Check size={12}/></button>
                                        <button onClick={() => setEditingId(null)} className="p-1 bg-red-500 text-white rounded"><X size={12}/></button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => startEditAward(award)} className="p-1 bg-white shadow-sm rounded text-apple-600"><Edit2 size={12}/></button>
                                        <button onClick={(e) => handleDelete(e, 'award', award.id)} className="p-1 bg-white shadow-sm rounded text-red-500 hover:bg-red-50"><Trash2 size={12}/></button>
                                    </>
                                )}
                            </div>
                           )}
                          
                          {editingId?.section === 'award' && editingId.id === award.id ? (
                              <div className="w-full space-y-1">
                                  <input className="w-full border rounded px-1 py-0.5 text-sm" value={awardForm.name} onChange={e => setAwardForm({...awardForm, name: e.target.value})} />
                                  <div className="flex gap-1">
                                      <input className="flex-1 border rounded px-1 py-0.5 text-xs" value={awardForm.level} onChange={e => setAwardForm({...awardForm, level: e.target.value})} />
                                      <input className="w-16 border rounded px-1 py-0.5 text-xs" value={awardForm.date} onChange={e => setAwardForm({...awardForm, date: e.target.value})} />
                                  </div>
                              </div>
                          ) : (
                              <>
                                <div className="flex flex-col">
                                    <span className="font-semibold text-apple-900">{award.name}</span>
                                    <span className="text-xs text-apple-500">{award.level}</span>
                                </div>
                                <span className="text-sm font-medium text-apple-400">{award.date}</span>
                              </>
                          )}
                      </div>
                  ))}
              </div>
          </section>

      </div>
    </div>
  );
};

export default Resume;