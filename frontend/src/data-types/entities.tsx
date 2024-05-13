export interface Astronaut {
  id: number;
  name: string;
  image: string;
  dateOfBirth: Date;
  onDuty: boolean;
  country: string;
  salary: number;
}

export interface Agency {
  id: number;
  name: string;
  mail: string;
  logo: string;
  isApproved: boolean;
}

export interface Company {
  id: number;
  name: string;
  userMail: string;
  country: string;
  logo: string;
  money: number;
}

export interface SpaceMission {
  id: number;
  missionName: string;
  image: string;
  objective: string;
  budget: number;
  createDate: Date;
  performDate: Date;
  platformId: number;
  creatorId: number;
  performerId: number;
  performStatus: string;
}

export interface Platform {
  id: number;
  platformName: string;
  productionYear: number;
  image: string;
  costPerLaunch: number;
}

export interface HealthRecord {
  id: number;
  astronautId: number;
  expertId: number;
  date: Date;
  availabilityForMission: boolean;
  weight: number;
  height: number;
  heartRate: number;
  bloodPressure: number;
  vaccinations: string;
  notes: string;
}
