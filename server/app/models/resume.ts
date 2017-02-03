import mongoose from 'mongoose';

interface Location {
  country: string; state: string; city?: string; address?: string;
};

interface Experience {
  desc: string;
  from: number;
  to?: number;
};

export interface ResumeDocument {
  nickName: string;
  name: string;
  contacts: { name: string; value: string; }[];
  age: number;
  motto: string;
  hometown: Location; 
  liveNow: Location;
  genderCatetgory: number;
  educations: Experience[];
  careers: Experience[];
  projections: { name: string; desc: string; link: string; }[];
}

const resumeSchema = new mongoose.Schema({
  nickName: {
    type: String,
    index: true,
    default: '',
  },
  name: {
    type: String,
    index: true,
    default: '',
  },
  contacts: {
    type: [{ name: String, value: String }],
    default: []
  },
  age: Number,
  motto: String,
  hometown: {
    type: {
      country: String,
      stateL: String,
      city: String,
      address: String,
    },
  },
  liveNow: {
    type: {
      country: String,
      stateL: String,
      city: String,
      address: String,
    },
  },
  genderCatetgory: Number,
  educations: [{ desc: String, from: Number, to: Number, }],
  careers: [{ desc: String, from: Number, to: Number, }],
  projections: [{ name: String, desc: String, link: String, }],
});

type MongoResumeDocument = ResumeDocument & mongoose.Document;

const resumeModel = mongoose.model<MongoResumeDocument>('Resume', resumeSchema, 'Resume');

export const ResumeModel = Object.assign(resumeModel, {});

