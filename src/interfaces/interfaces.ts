

/**
 * USERS & AUTHENTICATION
 */
export interface UserResponse {
    user:  User;
    token: string;
}

export interface User {
    movements: any[];
    name:      string;
    email:     string;
    status:    boolean;
    google:    boolean;
    role:      string;
    uid:       string;
}

export interface LoginData {
    email: string,
    password: string,
}

export interface RegisterData extends LoginData {
    name: string
}



/**
 * MUSCLES & WORKOUTS
 */
export interface GetWorkouts {
    workouts: Workout[];
    pathImg:  string;
}

export interface Workout {
    _id:    string;
    name:   string;
    muscle: string;
    status: boolean;
    __v:    number;
}

export interface GetMuscles {
    muscles: Muscle[];
    pathImg: string;
}

export interface Muscle {
    _id:    string;
    name:   string;
    status: boolean;
    __v:    number;
}



/**
 * ROUTINES
 */
export interface GetRoutines {
    page:     number;
    limit:    number;
    total:    number;
    routines: Routine[];
    msg:      string;
}

export interface RoutineResponse {
    routine: Routine;
    msg:     string;
}

export interface Routine {
    name:              string;
    typeUnit:          'kg' | 'lb';
    creatorUser:       string;
    actualUser:        string;
    img:               string;
    days:              Day[];
    creationDate:      number;
    isPendingToAccept: boolean;
    _id:               string;
    __v:               number;
}

export interface Day {
    workouts?: WorkoutInRoutine[];
    _id:      string;
}

export interface WorkoutInRoutine {
    workout:  Workout;
    tool:     string;
    sets:     Set[];
    _id?:     string;
}

export interface Set {
    numReps: string;
    weight:  string;
    _id:     string;
}

export interface RoutineCreateState {
    name:      string;
    typeUnit:  'kg' | 'lb';
    img:       string;
}



/**
 * IMAGES
 */
export interface ImgsRoutines {
    imagesList: string[];
}

/* export interface RoutineState {
    name:     string;
    typeUnit: string;
    img:      string;
    days:     DayState[];
}

export interface DayState {
    workouts?: WorkoutInRoutineState[];
    id?:        string;
}

export interface WorkoutInRoutineState {
    workout: string;
    tool:    string;
    sets?:   SetsState[];
    id?:      string;
}

export interface SetsState {
    numReps: string;
    weight:  string;
}
 */