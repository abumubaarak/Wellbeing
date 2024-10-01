import {useState} from 'react';
import {AnalyseResponse, api} from '../services/api';

export const useApi = () => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [problem, setProblem] = useState<string>();
  const [analysis, setAnalysis] = useState<AnalyseResponse>();

  const analyseSymptoms = async (symptoms: string) => {
    const response = await api.post<AnalyseResponse>('analyseSymptoms', {
      symptoms,
    });
    if (response.ok) {
      setLoading(false);
      setAnalysis(response.data);
    } else {
      if (response.problem) {
        setLoading(false);
        setProblem(response.problem);
      }
    }
  };

  return {analyseSymptoms, problem, analysis, isLoading};
};
