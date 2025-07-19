export interface InterviewRecord {
  id: string;
  studentName: string;
  proudMoment: string;
  funniestMemory: string;
  advice: string;
  favoriteTeacher: string;
  audioUrl: string;
  highlight?: string;
  createdAt: string;
}

export const saveInterviewRecord = (record: Omit<InterviewRecord, 'id' | 'createdAt'>) => {
  const existingRecords = getInterviewRecords();
  const newRecord: InterviewRecord = {
    ...record,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  
  const updatedRecords = [...existingRecords, newRecord];
  localStorage.setItem('voiceYearbook', JSON.stringify(updatedRecords));
  return newRecord;
};

export const getInterviewRecords = (): InterviewRecord[] => {
  try {
    const stored = localStorage.getItem('voiceYearbook');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const updateInterviewRecord = (id: string, updates: Partial<InterviewRecord>) => {
  const records = getInterviewRecords();
  const updatedRecords = records.map(record => 
    record.id === id ? { ...record, ...updates } : record
  );
  localStorage.setItem('voiceYearbook', JSON.stringify(updatedRecords));
};