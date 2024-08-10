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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductService = exports.updateProductService = exports.getProductService = exports.getProductsService = exports.createProductService = void 0;
const services_model_js_1 = __importDefault(require("./services.model.js"));
// Service to create a product
const createProductService = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield services_model_js_1.default.create(productData);
    return { message: "Product created successfully", product };
});
exports.createProductService = createProductService;
// Service to get all products with filtering, sorting, and pagination
const getProductsService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 5, sort } = query, filters = __rest(query, ["page", "limit", "sort"]);
    const productQuery = services_model_js_1.default.find(filters);
    if (sort) {
        const sortList = sort.split(",").join(" ");
        productQuery.sort(sortList);
    }
    const total = yield services_model_js_1.default.countDocuments(filters);
    const products = yield productQuery
        .skip((page - 1) * limit)
        .limit(Number(limit));
    return {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
        products,
    };
});
exports.getProductsService = getProductsService;
// Service to get a single product
const getProductService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield services_model_js_1.default.findById(id);
    if (!product) {
        throw new Error("Product not found");
    }
    return product;
});
exports.getProductService = getProductService;
// Service to update a product
const updateProductService = (id, productData) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield services_model_js_1.default.findByIdAndUpdate(id, productData, {
        new: true,
    });
    if (!product) {
        throw new Error("Product not found");
    }
    return { message: "Product updated successfully", product };
});
exports.updateProductService = updateProductService;
// Service to delete a product
const deleteProductService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield services_model_js_1.default.findByIdAndDelete(id);
    if (!product) {
        throw new Error("Product not found");
    }
    return { message: "Product deleted successfully" };
});
exports.deleteProductService = deleteProductService;
