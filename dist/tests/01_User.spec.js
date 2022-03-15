"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/M_users/user"));
const data_1 = require("./data/data");
const userStore = new user_1.default();
const token = '';
describe('Check Functions in user moder', () => {
    it('Test index function is existance', () => {
        expect(userStore.index).toBeDefined();
    });
    it('Test create function is existance', () => {
        expect(userStore.create).toBeDefined();
    });
    it('Test authenticate function is existance', () => {
        expect(userStore.authenticate).toBeDefined();
    });
});
describe('Check Functions performance', () => {
    it('Test create user', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = data_1.users[0];
        try {
            const u_json = yield userStore.create(user);
            expect(JSON.stringify(u_json[0])).toEqual(JSON.stringify({
                first_name: user.first_name,
                last_name: user.last_name,
            }));
        }
        catch (error) {
            console.log(error);
        }
    }));
});
